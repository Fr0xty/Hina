import { Hina } from '../../res/config.js';
export default class loopsong {
    name;
    description;
    constructor() {
        this.name = 'loopsong';
        this.description = 'loop now playing song in queue.';
    }
    async execute(msg, args) {
        const queue = Hina.player.getQueue(msg.guild);
        if (!queue)
            return await msg.reply("I'm not currently playing in this server.");
        queue.setRepeatMode(1);
        await msg.react(Hina.okEmoji);
    }
}
