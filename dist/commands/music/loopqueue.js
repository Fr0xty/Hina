import { Hina } from '../../res/config.js';
export default class loopqueue {
    name;
    description;
    aliases;
    constructor() {
        this.name = 'loopqueue';
        this.description = 'loop the music queue.';
        this.aliases = ['loopq'];
    }
    async execute(msg, args) {
        const queue = Hina.player.getQueue(msg.guild);
        if (!queue)
            return await msg.reply("I'm not currently playing in this server.");
        queue.setRepeatMode(2);
        await msg.react(Hina.okEmoji);
    }
}
