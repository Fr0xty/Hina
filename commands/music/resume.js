import { okEmoji } from '../../res/config.js';


export default {

    name: 'resume',
    aliases: [],
    description: 'resume the current song.',





    async execute(client, msg, args) {

        const profile = client.musicGuildProfile.get(msg.guildId);
        if (!profile) return await msg.reply('I\'m not currently playing in this server!');

        await profile.updateChannels(null, msg.channel);
        await profile.player.unpause();
        await msg.react(okEmoji);
    },





    async slashExecute(client, interaction) {
        return;
    },
};