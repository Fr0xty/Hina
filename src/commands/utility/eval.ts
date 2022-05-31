import { Client, Message } from 'discord.js';

import CommandArgument from '../../res/models/CommandArgument.js';
import { BaseCommand } from 'hina';

export default class evaluation implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'eval';
        this.description = 'run code in discord.';
        this.commandUsage = '<script>';
        this.args = [
            new CommandArgument({ type: 'paragraph' }).setName('script').setDescription('javascript code to run.'),
        ];
    }

    async execute(Hina: Client, msg: Message, args: string[]) {
        let [script] = args;
        script = script.trim();

        if (msg.author.id !== '395587171601350676') return;
        if (script.startsWith('```') && script.endsWith('```')) script = script.replace(/(^.*?\s)|(\n.*$)/g, '');

        try {
            // @ts-ignore
            let result = eval(`(async () => {${script}})()`);
        } catch (err) {
            console.log(err);
            // @ts-ignore
            await msg.reply(err.message);
        }
    }
}
