import { Message } from 'discord.js';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';

export default class reactemoji implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'reactemoji';
        this.description = 'react to message using the emoji id.';
        this.commandUsage = '<emoji_id>';
        this.args = [
            new CommandArgument()
                .setName('emoji_id')
                .setDescription('full emoji id without `<>`, can get using `getemoji` command.'),
        ];
    }

    async execute(msg: Message, args: string[]) {
        const [emoji_id] = args;

        if (!msg.reference)
            return await msg.reply('Please reply to the message you want to react to while using the command!');
        if (!args) return await msg.reply('Please provide the emoji id.');

        const theMsg = await msg.fetchReference();
        try {
            await theMsg.react(emoji_id);
            await msg.delete();
        } catch {
            await msg.reply(`Invalid emoji id: ${emoji_id}`);
        }
    }
}
