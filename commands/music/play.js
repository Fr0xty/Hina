import { joinVoiceChannel } from '@discordjs/voice';

import { GuildMusic } from '../../res/models/GuildMusic.js';
import { okEmoji } from '../../res/config.js';
import { queryYT } from '../../utils/music.js';


export default {

    name: 'play',
    aliases: [],
    description: 'add music to song queue.',





    async execute(client, msg, args) {
        
        // return if author not in vc || no query provided
        if (!msg.member.voice.channel) return await msg.reply('Please join a voice channel!');
        if(!args.length) return await msg.reply('Please provide a search keyword or a url.');

        // join vc
        const connection = joinVoiceChannel({
            channelId: msg.member.voice.channelId,
            guildId: msg.guildId,
            adapterCreator: msg.guild.voiceAdapterCreator,
        });

        // first time ? register guildProfile
        let profile = guildProfile.get(msg.guildId);
        if (!profile) {
            guildProfile.set(msg.guildId, new GuildMusic(client, msg.member.voice.channel, msg.channel));
            profile = guildProfile.get(msg.guildId);
        }
        else {
            // update channel
            await profile.updateChannels(null, msg.channel);
        }

        // search URL or keyword
        let result = await queryYT(args);

        await profile.addSong(result.resource, result.videoInfo);
        await msg.react(okEmoji);
    },





    async slashExecute(client, interaction) {
        return;
    },
};