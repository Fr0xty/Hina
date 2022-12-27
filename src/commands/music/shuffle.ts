import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('shuffle').setDescription('shuffle the song queue.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        /**
         * get server song queue
         */
        const queue = Hina.player.getQueue(interaction.guild!);

        /**
         * not playing songs in the server
         */
        if (!queue) return await interaction.reply("I'm not currently playing in this server.");

        /**
         * no song in queue
         */
        const npMusic = queue.nowPlaying();
        if (!npMusic) return await interaction.reply("I'm not currently playing any songs.");

        /**
         * shuffle queue
         */
        queue.shuffle();
        await interaction.reply(Hina.okEmoji);
    }
}
