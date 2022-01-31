const {
    joinVoiceChannel,
    getVoiceConnection,
    createAudioPlayer,
    createAudioResource,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const { MessageEmbed } = require('discord.js');

const { hinaColor, okEmoji } = require('../res/config');
const { searchYT } = require('../utils/music');


const playingGuilds = new Map();

module.exports = [

    {
        name: 'play',
        aliases: [],
        description: 'Add music to queue.',
        async execute(client, msg, args) {
            
            // return if author not in vc || no query provided
            if (!msg.member.voice.channel) return msg.channel.send('Please join a voice channel!');
            if(!args.length) return msg.channel.send('Please provide a search keyword or a url.');

            // if not already joined, join vc
            let connection;
            connection = getVoiceConnection(msg.guild.id);
            if (!connection) {
                connection = joinVoiceChannel({
                    channelId: msg.member.voice.channelId,
                    guildId: msg.guildId,
                    adapterCreator: msg.guild.voiceAdapterCreator,
                });
                
                // register playingGuilds
                playingGuilds.set(msg.guildId, {
                    vc: msg.member.voice.channel,
                    mc: msg.channel,
                    songs: [],
                    loop: false,
                });
            }
            else {
                // update channel incase is changed
                playingGuilds.set(msg.guilId, {
                    vc: msg.member.voice.channel,
                    mc: msg.channel,
                    songs: playingGuilds.get(msg.guildId).songs,
                    loop: playingGuilds.get(msg.guildId).loop,
                });
            };

            // search URL or keyword
            const query = args.join(' ');
            const video = await searchYT(query);
            if (!video) return msg.channel.send(`No YouTube videos is found with the keyword: \`${keyword}\``);

            const stream = ytdl(video.url, {filter: 'audioonly'});
            const resource = createAudioResource(stream);

            // push resource to queue
            const guildInfo = playingGuilds.get(msg.guildId);
            guildInfo.songs.push(resource);
            await msg.react(okEmoji);
            const embed = new MessageEmbed()
                .setColor(hinaColor)
                .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle('Song added to queue!')
                .setDescription(`[${video.title}](${video.url})`)
                .setFooter({text: `Song added by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL()})
                .setTimestamp();
            
            await msg.channel.send({ embeds: [embed] });
            
            // if no previous songs, play
            if(guildInfo.songs.length === 1) {

                const player = createAudioPlayer();
                player.play(resource, {seek: 0, volume: .5});
                connection.subscribe(player);

                const embed = new MessageEmbed()
                    .setColor(hinaColor)
                    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
                    .setTitle('Now Playing:')
                    .setDescription(`[${video.title}](${video.url})`)
                    .setTimestamp();
                await msg.channel.send({ embeds: [embed] });
            }
            else {
                guildInfo.songs.push();
            }
        }
    },



    {
        name: 'join',
        aliases: [],
        description: 'I will join your voice channel.',
        async execute(client, msg, args) {

            // author not in vc
            if (!msg.member.voice.channel) return msg.channel.send('Please join a voice channel!');

            // join vc & register playingGuilds
            try {
                const connection = joinVoiceChannel({
                    channelId: msg.member.voice.channelId,
                    guildId: msg.guildId,
                    adapterCreator: msg.guild.voiceAdapterCreator,
                });

                // if first time joining, register
                if (!playingGuilds.get(msg.guildId)) {
                    playingGuilds.set(msg.guildId, {
                        vc: msg.member.voice.channel,
                        mc: msg.channel,
                        songs: [],
                        loop: false,
                    });
                };
                await msg.react(okEmoji);
            }
            catch (err) {
                await msg.channel.send('Error trying to join voice channel! Please check permissions and server settings.');
            };
        }
    },



    {
        name: 'leave',
        aliases: [],
        description: 'I will leave your voice channel.',
        async execute(client, msg, args) {
            
            const connection = getVoiceConnection(msg.guild.id);
            if (!connection) return msg.channel.send('I\'m not in any voice channel!');

            connection.destroy();
            playingGuilds.delete(msg.guildId);
            await msg.react(okEmoji);
        }
    },



    {
        name: 'search',
        aliases: [],
        description: 'debugging command (temporary)',
        async execute(client, msg, args) {

            const video = await searchYT(args[0]);
            console.log(video.title);
        }
    }
];