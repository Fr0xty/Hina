import { okEmoji } from '../../res/config.js';


export default {

    name: 'skip',
    aliases: [],
    description: 'skip the current song.',





    async execute(Hina, msg, args) {

        const profile = Hina.musicGuildProfile.get(msg.guildId);
        if (!profile) return await msg.reply('I\'m not currently playing in this server!');

        await profile.updateChannels(null, msg.channel);
        await profile.player.stop();
        await msg.react(okEmoji);
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};