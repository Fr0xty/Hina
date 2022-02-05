import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';
import ytdl from 'ytdl-core';
import ffmpeg from 'ffmpeg-static';
import { MessageEmbed } from 'discord.js';

import { GuildMusic } from '../res/models/GuildMusic.js';
import { hinaColor, okEmoji } from '../res/config.js';
import { queryYT } from '../utils/music.js';
import { paginator } from '../utils/paginator.js';
import { guildOrClientIcon } from '../utils/general.js';


const guildProfile = new Map();

export const commands = [

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
                await profile.updateChannels(null, msg.channel);
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

            if (!msg.guild.me.permissions.has('CONNECT') || !msg.guild.me.permissions.has('SPEAK')) return await msg.reply('Please enable "Connect" and "Speak" permissions for me in order to use this feature.');

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

            await profile.updateChannels(null, msg.channel);
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

            await profile.updateChannels(null, msg.channel);
            await profile.player.unpause();
            await msg.react(okEmoji);
        }
    },



    {
        name: 'skip',
        aliases: [],
        description: 'skip the current song.',
        async execute(client, msg, args) {

            const profile = guildProfile.get(msg.guildId);
            if (!profile) return await msg.reply('I\'m not currently playing in this server!');

            await profile.updateChannels(null, msg.channel);
            await profile.player.stop();
            await msg.react(okEmoji);
        }
    },



    {
        name: 'queue',
        aliases: ['q'],
        description: 'get song queue of the server.',
        async execute(client, msg, args) {

            const profile = guildProfile.get(msg.guildId);
            if (!profile) return await msg.reply('I\'m not currently playing in this server!');
            if (!profile.songs.length) return await msg.reply('There is no songs in queue currently.');

            await profile.updateChannels(null, msg.channel);
            const pages = await profile.getQueue();
            await paginator(msg, pages, 120_000);
        }
    },



    {
        name: 'clearqueue',
        aliases: ['clearq'],
        description: 'clear server song queue.',
        async execute(client, msg, args) {

            const profile = guildProfile.get(msg.guildId);
            if (!profile) return await msg.reply('I\'m not currently playing in this server!');
            if (!profile.songs.length) return await msg.reply('There is no songs in queue currently.');

            await profile.updateChannels(null, msg.channel);
            await profile.clearQueue();
            await profile.player.stop();
            
            const authorIcon = await guildOrClientIcon(client, msg.guild);
            const embed = new MessageEmbed()
                .setColor(hinaColor)
                .setAuthor({name: `${msg.guild.name} Song Queue`, iconURL: authorIcon})
                .setDescription('Server song queue cleared successfully!')
                .setFooter({text: `Queue cleared by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({size: 4096, dynamic: true})});
            await msg.reply({ embeds: [embed] });
        }
    },
];