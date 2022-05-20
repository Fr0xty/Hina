import { Hina } from '../../res/config.js';
export default class loopcancel {
    name;
    description;
    constructor() {
        this.name = 'loopcancel';
        this.description = 'cancel queue / song loop.';
    }
    async execute(msg, args) {
        const queue = Hina.player.getQueue(msg.guild);
        if (!queue)
            return await msg.reply("I'm not currently playing in this server.");
        queue.setRepeatMode(0);
        await msg.react(Hina.okEmoji);
    }
}
