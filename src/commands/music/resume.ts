import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('resume').setDescription('resume current playing song.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        /**
         * get server song queue
         */
        const queue = Hina.player.getQueue(interaction.guild!);

        /**
         * not playing in the server
         */
        if (!queue) return await interaction.reply("I'm not currently playing in this server.");

        queue.setPaused(false);
        await interaction.reply(Hina.okEmoji);
    }
}
