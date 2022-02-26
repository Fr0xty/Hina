import { hinaColor, hinaImageOption } from '../../res/config.js';
import { guildOrHinaIcon } from '../../utils/general.js';


export default {

    name: 'nowplaying',
    aliases: ['np'],
    description: 'get now playing song.',





    async execute(Hina, msg, args) {
        
        const profile = Hina.musicGuildProfile.get(msg.guildId);
        if (!profile) return await msg.reply('I\'m not currently playing in this server!');
        if (!profile.songs.length) return await msg.reply('There is no songs in queue currently.');

        await profile.updateChannels(null, msg.channel);
        await profile._nowPlayingAnnounce();
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};