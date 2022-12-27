import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('leave').setDescription('I will leave the voice channel.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        /**
         * get server song queue
         */
        const queue = Hina.player.getQueue(interaction.guild!);

        /**
         * not in voice channel in the server
         */
        if (!queue) return await interaction.reply("I'm not currently playing songs in this server.");

        /**
         * destroy queue
         */
        queue.destroy(true);
        await interaction.reply(Hina.okEmoji);
    }
}
