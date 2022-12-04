import {
    Client,
    CommandInteraction,
    Message,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

export default abstract class BaseCommand {
    /**
     * name of the command
     */
    public readonly name: string;

    /**
     * description of the command
     */
    public readonly description: string;

    /**
     * readable format of the command arguments need
     */
    public readonly commandArgumentUsage: string;

    /**
     * slashCommandBuilder object of the command
     */
    public readonly slashCommandBuilder: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

    constructor(slashCommandBuilder: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>) {
        this.slashCommandBuilder = slashCommandBuilder;
        this.name = this.slashCommandBuilder.name;
        this.description = this.slashCommandBuilder.description;
        this.commandArgumentUsage = BaseCommand.formatCommandArgumentUsage(this.slashCommandBuilder);
    }

    /**
     * return command argument as string from SlashCommandBuilder object
     */
    private static formatCommandArgumentUsage(
        slashCommandBuilder: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
    ) {
        return 'not implemented yet';
    }

    /**
     * function to be executed when slash command is called
     */
    abstract slashExecute(Hina: Client, interaction: CommandInteraction): Promise<any>;
}
