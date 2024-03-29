import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('resume')
                .setDescription('resume current playing song.')
                .setDMPermission(false)
        );
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

        /**
         * resume queue
         */
        queue.setPaused(false);
        await interaction.reply(Hina.okEmoji);
    }
}
