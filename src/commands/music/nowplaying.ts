import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';
import { EmbedBuilder } from '@discordjs/builders';

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('nowplaying').setDescription('get current playing song.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        /**
         * get server song queue
         */
        const queue = Hina.player.getQueue(interaction.guild!);

        /**
         * not playing any song in server
         */
        if (!queue) return await interaction.reply("I'm not currently playing songs in this server.");

        /**
         * get song
         */
        const npMusic = queue.nowPlaying();

        /**
         * song queue is empty
         */
        if (!npMusic) return await interaction.reply('There is no more music in queue, use `play` to add more songs.');

        /**
         * format info into embed
         */
        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        const embed = new EmbedBuilder()
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
        await interaction.reply({ embeds: [embed] });
    }
}
