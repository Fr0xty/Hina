import { Client, Message } from 'discord.js';

import { BaseCommand } from 'hina';

export default class loopqueue implements BaseCommand {
    name: String;
    description: String;
    aliases: String[];

    constructor() {
        this.name = 'loopqueue';
        this.description = 'loop the music queue.';
        this.aliases = ['loopq'];
    }

    async execute(Hina: Client, msg: Message, args: string[]) {
        const queue = Hina.player.getQueue(msg.guild!);
        if (!queue) return await msg.reply("I'm not currently playing in this server.");

        queue.setRepeatMode(2);
        await msg.react(Hina.okEmoji);
    }
}
