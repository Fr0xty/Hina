import { Hina } from '../../res/config.js';
export default class skip {
    name;
    description;
    constructor() {
        this.name = 'skip';
        this.description = 'clear server song queue.';
    }
    async execute(msg, args) {
        const queue = Hina.player.getQueue(msg.guild);
        if (!queue)
            await msg.reply("I'm not currently playing in this server.");
        queue.skip();
    }
}
