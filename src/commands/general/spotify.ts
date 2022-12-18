import { ActivityType, Client, CommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';
import { EmbedBuilder } from '@discordjs/builders';
import { convertSeconds } from '../../utils/convert.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('spotify')
                .setDescription("get user's current spotify listening info.")
                .addUserOption((option) => option.setName('user').setDescription('the user to fetch info on.'))
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            user: interaction.options.get('user')?.value as string | undefined,
        };

        /**
         * fetch member object
         */
        let member: GuildMember | undefined;
        try {
            member = await interaction.guild!.members.fetch(args.user ?? interaction.user.id);
        } catch {
            return await interaction.reply({
                content: 'Invalid user. The user has to be a member of this server.',
                ephemeral: true,
            });
        }

        const activities = member.presence?.activities;
        if (!activities) {
            return await interaction.reply(`${member} is not listening to Spotify.`);
        }

        /**
         * get spotify activity from activities array
         */
        const spotifyActivity = activities
            .filter((act) => act.name === 'Spotify' && act.type === ActivityType.Listening)
            .shift();
        if (!spotifyActivity) return await interaction.reply(`${member} is not listening to Spotify.`);

        /**
         * found spotify activity, format into an embed
         */
        const spotifyActivityData = {
            songName: spotifyActivity.details,
            // songUrl: `https://open.spotify.com/track/${spotifyActivity.syncId}`,
            albumArt: `https://i.scdn.co/image/${spotifyActivity.assets!.largeImage?.split(':')[1]}`,
            artists: spotifyActivity.state!.replace(';', ','),
            albumName: spotifyActivity.assets!.largeText,
            startTime: Math.round(Math.abs(Number(spotifyActivity.timestamps!.start) / 1000)),
            endTime: Math.round(Math.abs(Number(spotifyActivity.timestamps!.end) / 1000)),
            partyID: spotifyActivity.party!.id,
            get songDuration() {
                return (async () => {
                    return await convertSeconds(Math.abs(this.endTime - this.startTime));
                })();
            },
        };

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${member!.user.tag}'s Spotify Activity`,
                iconURL: 'https://cdn.discordapp.com/emojis/936844383926517771.webp?size=96&quality=lossless',
            })
            .setColor(1947988)
            .setTitle(spotifyActivityData.songName)
            // .setURL(songUrl)
            .setThumbnail(spotifyActivityData.albumArt)
            .setTimestamp()
            .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
            }).setDescription(`
artist(s):
\`${spotifyActivityData.artists}\`

album:
\`${spotifyActivityData.albumName}\`

song started:
<t:${spotifyActivityData.startTime}:t> | <t:${spotifyActivityData.startTime}:R>

ending song:
<t:${spotifyActivityData.endTime}:t> | <t:${spotifyActivityData.endTime}:R>

song duration: \`${await spotifyActivityData.songDuration}\`

party id: \`${spotifyActivityData.partyID}\`
                `);

        return await interaction.reply({ embeds: [embed] });
    }
}
