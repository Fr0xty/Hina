import { Message } from 'discord.js';
import { BaseCommand } from 'hina';
import Hina from '../../res/HinaClient.js';

export default class loopcancel implements BaseCommand {
    name: String;
    description: String;

    constructor() {
        this.name = 'loopcancel';
        this.description = 'cancel queue / song loop.';
    }

    async execute(msg: Message, args: string[]) {
        const queue = Hina.player.getQueue(msg.guild!);
        if (!queue) return await msg.reply("I'm not currently playing in this server.");

        queue.setRepeatMode(0);
        await msg.react(Hina.okEmoji);
    }
}
