import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('pause')
                .setDescription('pause current playing song.')
                .setDMPermission(false)
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        /**
         * get server song queue
         */
        const queue = Hina.player.getQueue(interaction.guild!);

        /**
         * not playing songs in the server
         */
        if (!queue) return await interaction.reply("I'm not currently playing songs in this server.");

        /**
         * pause queue
         */
        queue.setPaused(true);
        await interaction.reply(Hina.okEmoji);
    }
}
