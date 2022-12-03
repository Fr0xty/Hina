import { Client, CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('testcommand')
                .setDescription('a temporary test command for new design structure.')
        );
    }

    async execute(Hina: Client, msg: Message, args: string[]) {
        await msg.reply('command working');
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        await interaction.reply('working yo');
    }
}
