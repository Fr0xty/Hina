const {
    joinVoiceChannel,
    getVoiceConnection,
    createAudioPlayer,
    createAudioResource,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const { MessageEmbed } = require('discord.js');

const { GuildMusic } = require('../res/models/GuildMusic');
const { hinaColor, okEmoji } = require('../res/config');
const { queryYT } = require('../utils/music');


const guildProfile = new Map();

module.exports = [

    {
        name: 'play',
        aliases: [],
        description: 'Add music to queue.',
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
                await profile.updateChannels(msg.member.voice.channel, msg.channel);
            }

            // search URL or keyword
            let result = await queryYT(args);

            await profile.addSong(result.resource, result.videoInfo);
            await msg.react(okEmoji);
        }
    },



    {
        name: 'join',
        aliases: [],
        description: 'I will join your voice channel.',
        async execute(client, msg, args) {

            // author not in vc
            if (!msg.member.voice.channel) return await msg.reply('Please join a voice channel!');

            // join vc
            try {
                const connection = joinVoiceChannel({
                    channelId: msg.member.voice.channelId,
                    guildId: msg.guildId,
                    adapterCreator: msg.guild.voiceAdapterCreator,
                });

                // if first time joining, register
                if (!guildProfile.get(msg.guildId)) {
                    guildProfile.set(msg.guildId, new GuildMusic(client, msg.member.voice.channel, msg.channel));
                }
                else {
                    // update channel
                    const profile = guildProfile.get(msg.guildId);
                    await profile.updateChannels(msg.member.voice.channel, msg.channel);
                }
                await msg.react(okEmoji);
            }
            catch (err) {
                console.log(err);
                await msg.reply('Error trying to join voice channel! Please check permissions and server settings.');
            };
        }
    },



    {
        name: 'leave',
        aliases: [],
        description: 'I will leave your voice channel.',
        async execute(client, msg, args) {
            
            const connection = getVoiceConnection(msg.guild.id);
            if (!connection) return await msg.reply('I\'m not currently playing in this server!');

            connection.destroy();
            guildProfile.delete(msg.guildId);
            await msg.react(okEmoji);
        }
    },



    {
        name: 'pause',
        aliases: [],
        description: 'pause the current song.',
        async execute(client, msg, args) {

            const profile = guildProfile.get(msg.guildId);
            if (!profile) return await msg.reply('I\'m not currently playing in this server!');

            await profile.player.pause();
            await msg.react(okEmoji);
        }
    },



    {
        name: 'resume',
        aliases: [],
        description: 'resume the current song.',
        async execute(client, msg, args) {

            const profile = guildProfile.get(msg.guildId);
            if (!profile) return await msg.reply('I\'m not currently playing in this server!');

            await profile.player.unpause();
            await msg.react(okEmoji);
        }
    },
];