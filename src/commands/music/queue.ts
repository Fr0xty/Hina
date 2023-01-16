import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import { QueueRepeatMode } from 'discord-player';
import { interactionPaginator } from '../../utils/paginator.js';

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('queue').setDescription('get song queue of the server.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        /**
         * get server song queue
         */
        const queue = Hina.player.getQueue(interaction.guild!);
        if (!queue) return await interaction.reply("I'm not currently playing in this server.");

        /**
         * no song in queue
         */
        const npMusic = queue.nowPlaying();
        if (!npMusic) return await interaction.reply('There is no more music in queue, use `play` to add more songs.');

        /**
         * get current loop option applied
         */
        let _;
        switch (queue.repeatMode) {
            case QueueRepeatMode.OFF:
                _ = 'No loop applied 🔄';
                break;
            case QueueRepeatMode.TRACK:
                _ = 'Song loop applied 🔄';
                break;
            case QueueRepeatMode.QUEUE:
                _ = 'Queue loop applied 🔄';
                break;
        }
        const loopMessage = _ as string; // type cast to avoid undefined: reason being autoplay is not an option for users

        /**
         * only 1 song in queue: return simple embed
         */
        if (!queue.tracks.length) {
            const embed = new EmbedBuilder()
                .setColor(Hina.color)
                .setAuthor({
                    name: `Music queue for ${queue.guild.name}`,
                    iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
                })
                .setTitle('Now Playing:')
                .setDescription(
                    `
[${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\`

no more songs in queue...
                `
                )
                .setFooter({
                    text: `${loopMessage}\nRequested by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp();
            return await interaction.reply({ embeds: [embed] });
        }

        /**
         * more that 1 song in queue: pagination
         */
        let songNum = 2;
        let page = `[${queue.nowPlaying().title}](${queue.nowPlaying().url})\n\n`;
        const pages: EmbedBuilder[] = [];
        queue.tracks.forEach((track, i) => {
            page += `**${songNum++}.** [${track.title}](${track.url})\n`;

            if (songNum % 15 === 0 || queue.tracks.length === i + 1) {
                const embed = new EmbedBuilder()
                    .setColor(Hina.color)
                    .setAuthor({
                        name: `Music queue for ${queue.guild.name} | Page ${pages.length + 1} / ${Math.ceil(
                            (queue.tracks.length + 1) / 15
                        )}`,
                        iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
                    })
                    .setDescription(page)
                    .setTimestamp()
                    .setFooter({
                        text: `${loopMessage}\nRequested by ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    });
                if (!pages.length) embed.setTitle('Now Playing:');

                pages.push(embed);
                page = '';
            }
        });

        await interactionPaginator(interaction, pages, 120_000);
    }
}
