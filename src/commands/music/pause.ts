import { Client, Message } from 'discord.js';

import { BaseCommand } from 'hina';

export default class pause implements BaseCommand {
    name: String;
    description: String;

    constructor() {
        this.name = 'pause';
        this.description = 'clear server song queue.';
    }

    async execute(Hina: Client, msg: Message, args: string[]) {
        const queue = Hina.player.getQueue(msg.guild!);
        if (!queue) return await msg.reply("I'm not currently playing in this server.");

        queue.setPaused(true);
        await msg.react(Hina.okEmoji);
    }
}
