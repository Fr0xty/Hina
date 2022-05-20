import { Hina } from '../../res/config.js';
export default class resume {
    name;
    description;
    constructor() {
        this.name = 'resume';
        this.description = 'clear server song queue.';
    }
    async execute(msg, args) {
        const queue = Hina.player.getQueue(msg.guild);
        if (!queue)
            return await msg.reply("I'm not currently playing in this server.");
        queue.setPaused(false);
        await msg.react(Hina.okEmoji);
    }
}
