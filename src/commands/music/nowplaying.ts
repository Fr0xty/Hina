import { Message, MessageEmbed } from 'discord.js';
import { BaseCommand } from 'hina';
import { Hina } from '../../res/config.js';

export default class nowplaying implements BaseCommand {
    name: String;
    description: String;
    aliases: String[];

    constructor() {
        this.name = 'nowplaying';
        this.description = 'clear server song queue.';
        this.aliases = ['np'];
    }

    async execute(msg: Message, args: string[]) {
        const queue = Hina.player.getQueue(msg.guild!);
        if (!queue) return await msg.reply("I'm not currently playing in this server.");

        const npMusic = queue.nowPlaying();
        if (!npMusic) return await msg.reply('There is no more music in queue, use `play` to add more songs.');

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        const embed = new MessageEmbed()
            .setColor(Hina.color)
            .setAuthor({
                name: `Music queue for ${queue.guild.name}`,
                iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
            })
            .setThumbnail(npMusic.thumbnail)
            .setTitle('Now Playing:')
            .setDescription(
                `
[${npMusic.title}](${npMusic.url}) - \`${npMusic.duration}\`

${progress}
[**${timestamp.progress}**%]
                `
            )
            .addFields(
                { name: 'Source', value: npMusic.source },
                { name: 'Artist', value: npMusic.author },
                { name: 'Views', value: String(npMusic.views) },
                { name: 'Requested by', value: `<@${npMusic.requestedBy.id}>` }
            );
        await msg.reply({ embeds: [embed] });
    }
}
