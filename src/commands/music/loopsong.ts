import { Message } from 'discord.js';
import { BaseCommand } from 'hina';
import { Hina } from '../../res/config.js';

export default class loopsong implements BaseCommand {
    name: String;
    description: String;

    constructor() {
        this.name = 'loopsong';
        this.description = 'loop now playing song in queue.';
    }

    async execute(msg: Message, args: string[]) {
        const queue = Hina.player.getQueue(msg.guild!);
        if (!queue) return await msg.reply("I'm not currently playing in this server.");

        const loopSuccess = queue.setRepeatMode(1);
        await msg.react(Hina.okEmoji);
    }
}
