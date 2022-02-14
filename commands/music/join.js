import { joinVoiceChannel } from '@discordjs/voice';

import { GuildMusic } from '../../res/models/GuildMusic.js';
import { okEmoji } from '../../res/config.js';


export default {

    name: 'join',
    aliases: [],
    description: 'I will join your voice channel.',





    async execute(Hina, msg, args) {
        
        // author not in vc
        if (!msg.member.voice.channel) return await msg.reply('Please join a voice channel!');

        if (!msg.guild.me.permissions.has('CONNECT') || !msg.guild.me.permissions.has('SPEAK')) return await msg.reply('Please enable "Connect" and "Speak" permissions for me in order to use this feature.');

        // join vc
        const connection = joinVoiceChannel({
            channelId: msg.member.voice.channelId,
            guildId: msg.guildId,
            adapterCreator: msg.guild.voiceAdapterCreator,
        });

        // if first time joining, register
        if (!Hina.musicGuildProfile.get(msg.guildId)) {
            Hina.musicGuildProfile.set(msg.guildId, new GuildMusic(Hina, msg.member.voice.channel, msg.channel));
        }
        else {
            // update channel
            const profile = Hina.musicGuildProfile.get(msg.guildId);
            await profile.updateChannels(msg.member.voice.channel, msg.channel);
        }
        await msg.react(okEmoji);
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};