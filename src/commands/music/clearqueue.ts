import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('clearqueue').setDescription('clear song queue.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        /**
         * get server song queue
         */
        const queue = Hina.player.getQueue(interaction.guild!);

        /**
         * server has no queue (not playing music)
         */
        if (!queue) return await interaction.reply("I'm not currently playing songs in this server.");

        /**
         * no song in queue
         */
        if (!queue.nowPlaying()) return await interaction.reply('There is no music in queue.');

        queue.clear();
        await interaction.reply(Hina.okEmoji);
    }
}
