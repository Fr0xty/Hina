import { Message } from 'discord.js';
import { BaseCommand } from 'hina';

export default class queue implements BaseCommand {
    name: String;
    description: String;
    aliases: String[];

    constructor() {
        this.name = 'queue';
        this.description = 'clear server song queue.';
        this.aliases = ['q'];
    }

    async execute(msg: Message, args: string[]) {
        await msg.reply('Sorry, music commands are currently down. They will be back in the next version. (v2.2.0)');
    }
}
