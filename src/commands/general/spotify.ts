import { Message, MessageEmbed } from 'discord.js';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import { hinaImageOption } from '../../res/config.js';
import { convertSeconds } from '../../utils/convert.js';

export default class spotify implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'spotify';
        this.description = 'get user spotify listening info.';
        this.commandUsage = '[@user/user_id]';
        this.args = [
            new CommandArgument({ optional: true })
                .setName('@user/user_id')
                .setDescription('the user to fetch spotify info, leave blank will default to yourself.'),
        ];
    }

    async execute(msg: Message, args: string[]) {
        const [user] = args;

        let member;
        try {
            member = user
                ? await msg.guild!.members.fetch({ user: user.match(/[0-9]+/)![0], withPresences: true })
                : msg.member;
        } catch {
            return await msg.reply("Invalid member! Either the user isn't in the server or invalid id / mention.");
        }
        const activities = member!.presence?.activities;

        if (activities) {
            const spotifyAct = activities.filter((act) => act.name === 'Spotify' && act.type === 'LISTENING').shift();
            if (!spotifyAct) return await msg.reply(`${member} is not listening to Spotify!`);

            const songName = spotifyAct.details;
            const songUrl = `https://open.spotify.com/track/${spotifyAct.syncId}`;
            const albumArt = spotifyAct.assets!.largeImageURL();
            const artists = spotifyAct.state!.replace(';', ',');
            const albumName = spotifyAct.assets!.largeText;
            const startTime = Math.round(Math.abs(Number(spotifyAct.timestamps!.start) / 1000));
            const endTime = Math.round(Math.abs(Number(spotifyAct.timestamps!.end) / 1000));
            const songDuration = await convertSeconds(Math.abs(endTime - startTime));
            const partyID = spotifyAct.party!.id;

            const embed = new MessageEmbed()
                .setAuthor({
                    name: `${member!.user.tag}'s Spotify Activity`,
                    iconURL: 'https://cdn.discordapp.com/emojis/936844383926517771.webp?size=96&quality=lossless',
                })
                .setColor('#1DB954')
                .setTitle(songName!)
                .setURL(songUrl)
                .setThumbnail(albumArt!)
                .setTimestamp()
                .setFooter({
                    text: `Requested by: ${msg.author.tag}`,
                    iconURL: msg.author.displayAvatarURL(hinaImageOption),
                }).setDescription(`
artist(s):
\`${artists}\`

album:
\`${albumName}\`

song started:
<t:${startTime}:t> | <t:${startTime}:R>

ending song:
<t:${endTime}:t> | <t:${endTime}:R>

song duration: \`${songDuration}\`

party id: \`${partyID}\`
                `);

            await msg.reply({ embeds: [embed] });
            return;
        }
        await msg.reply(`${member} is not listening to Spotify!`);
    }
}
