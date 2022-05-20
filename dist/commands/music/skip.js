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
            return await msg.reply("I'm not currently playing in this server.");
        const npMusic = queue.nowPlaying();
        if (!npMusic)
            return await msg.reply("I'm not currently playing any songs.");
        queue.skip();
        await msg.react(Hina.okEmoji);
    }
}
