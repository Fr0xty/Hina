import { Client, CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('getemoji')
                .setDescription('get all of the server emoji ids.')
                .addIntegerOption((option) =>
                    option.setName('server_id').setDescription('server id of the emoji hosting server.')
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        await interaction.reply('working yo');
    }
}
