import { joinVoiceChannel } from '@discordjs/voice';

import { GuildMusic } from '../../res/models/GuildMusic.js';
import { okEmoji } from '../../res/config.js';
import { queryYT } from '../../utils/music.js';


export default {

    name: 'play',
    aliases: [],
    description: 'add music to song queue.',





    async execute(Hina, msg, args) {
        
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
        let profile = Hina.musicGuildProfile.get(msg.guildId);
        if (!profile) {
            Hina.musicGuildProfile.set(msg.guildId, new GuildMusic(Hina, msg.member.voice.channel, msg.channel));
            profile = Hina.musicGuildProfile.get(msg.guildId);
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





    async slashExecute(Hina, interaction) {
        return;
    },
};