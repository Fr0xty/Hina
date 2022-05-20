import { Hina } from '../../res/config.js';
export default class leave {
    name;
    description;
    constructor() {
        this.name = 'leave';
        this.description = 'clear server song queue.';
    }
    async execute(msg, args) {
        const queue = Hina.player.getQueue(msg.guild);
        if (!queue)
            return await msg.reply("I'm not currently playing in this server.");
        queue.destroy(true);
        await msg.react(Hina.okEmoji);
    }
}
