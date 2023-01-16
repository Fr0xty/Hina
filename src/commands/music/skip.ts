import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('skip').setDescription('skip curent song in song queue.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        /**
         * get server song queue
         */
        const queue = Hina.player.getQueue(interaction.guild!);

        /**
         * not playing songs in server
         */
        if (!queue) return await interaction.reply("I'm not currently playing in this server.");

        /**
         * no song in queue
         */
        const npMusic = queue.nowPlaying();
        if (!npMusic) return await interaction.reply("I'm not currently playing any songs.");

        /**
         * skip song
         */
        queue.skip();
        await interaction.reply(Hina.okEmoji);
    }
}
