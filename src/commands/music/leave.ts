import { Message } from 'discord.js';
import { BaseCommand } from 'hina';
import { Hina, okEmoji } from '../../res/config.js';

export default class leave implements BaseCommand {
    name: String;
    description: String;

    constructor() {
        this.name = 'leave';
        this.description = 'clear server song queue.';
    }

    async execute(msg: Message, args: string[]) {
        const queue = Hina.player.getQueue(msg.guild!);
        if (!queue) return await msg.reply("I'm not currently playing in this server.");

        queue.destroy(true);
        await msg.react(okEmoji);
    }
}
