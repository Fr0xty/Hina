import { Message } from 'discord.js';
import { BaseCommand } from 'hina';
import { Hina, okEmoji } from '../../res/config.js';

export default class clearqueue implements BaseCommand {
    name: String;
    description: String;
    aliases: String[];

    constructor() {
        this.name = 'clearqueue';
        this.description = 'clear server song queue.';
        this.aliases = ['clearq'];
    }

    async execute(msg: Message, args: string[]) {
        const queue = Hina.player.getQueue(msg.guild!);
        if (!queue) return await msg.reply("I'm not currently playing in this server.");
        if (!queue.nowPlaying()) return await msg.reply('There is no music in queue.');

        queue.clear();
        await msg.react(okEmoji);
    }
}
