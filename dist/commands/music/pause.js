import { Hina } from '../../res/config.js';
export default class pause {
    name;
    description;
    constructor() {
        this.name = 'pause';
        this.description = 'clear server song queue.';
    }
    async execute(msg, args) {
        const queue = Hina.player.getQueue(msg.guild);
        if (!queue)
            return await msg.reply("I'm not currently playing in this server.");
        queue.setPaused(true);
        await msg.react(Hina.okEmoji);
    }
}
