import { Client, CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

export default abstract class BaseCommand {
    public readonly name: string;
    public readonly description: string;
    public readonly commandArgumentUsage: string;
    public readonly slashCommandBuilder: SlashCommandBuilder;

    constructor(slashCommandBuilder: SlashCommandBuilder) {
        this.slashCommandBuilder = slashCommandBuilder;
        this.name = this.slashCommandBuilder.name;
        this.description = this.slashCommandBuilder.description;
        this.commandArgumentUsage = BaseCommand.formatCommandArgumentUsage(this.slashCommandBuilder);
    }

    /**
     * return command argument as string from SlashCommandBuilder object
     */
    private static formatCommandArgumentUsage(slashCommandBuilder: SlashCommandBuilder) {
        return 'not implemented yet';
    }

    abstract execute(Hina: Client, msg: Message, args: string[]): Promise<any>;
    abstract slashExecute(Hina: Client, interaction: CommandInteraction): Promise<any>;
}
