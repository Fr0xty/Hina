declare module 'hina' {
    import { Message } from 'discord.js';

    import Hina from '../../src/res/HinaClient';
    import CommandArgument from '../../src/res/models/CommandArgument';

    export class BaseCommand {
        name: String;
        description: String;
        commandUsage?: String;
        aliases?: String[];
        args?: CommandArgument[];
        execute(Hina: Hina, msg: Message, args: string[]): Promise<any>;
        slashExecute?(Hina: Hina, interaction: CommandInteraction): Promise<any>;
    }
}
