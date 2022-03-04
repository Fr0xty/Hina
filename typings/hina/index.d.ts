declare module 'hina' {
    import CommandArgument from '../../src/res/models/CommandArgument';
    import { Message } from 'discord.js';

    export class BaseCommand {
        name: String;
        description: String;
        commandUsage?: String;
        aliases?: String[];
        args?: CommandArgument[];
        execute(msg: Message, args: string[]): Promise<any>;
        slashExecute?(interaction: CommandInteraction): Promise<any>;
    }
}
