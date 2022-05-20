import { Hina } from '../../res/config.js';
export default class shuffle {
    name;
    description;
    constructor() {
        this.name = 'shuffle';
        this.description = 'shuffle current queue.';
    }
    async execute(msg, args) {
        const queue = Hina.player.getQueue(msg.guild);
        if (!queue)
            return await msg.reply("I'm not currently playing in this server.");
        const npMusic = queue.nowPlaying();
        if (!npMusic)
            return await msg.reply("I'm not currently playing any songs.");
        queue.shuffle();
        await msg.react(Hina.okEmoji);
    }
}
