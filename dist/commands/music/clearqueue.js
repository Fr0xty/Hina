import { Hina } from '../../res/config.js';
export default class clearqueue {
    name;
    description;
    aliases;
    constructor() {
        this.name = 'clearqueue';
        this.description = 'clear server song queue.';
        this.aliases = ['clearq'];
    }
    async execute(msg, args) {
        const queue = Hina.player.getQueue(msg.guild);
        if (!queue)
            return await msg.reply("I'm not currently playing in this server.");
        if (!queue.nowPlaying())
            return await msg.reply('There is no music in queue.');
        queue.clear();
        await msg.react(Hina.okEmoji);
    }
}
