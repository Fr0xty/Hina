const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const ffmpeg = require('ffmpeg-static');


const playingGuilds = new Map();

module.exports = [

    {
        name: 'play',
        aliases: [],
        description: 'Add music to queue.',
        async execute(client, msg, args) {

            let connection;

            if (!msg.member.voice.channel) return msg.channel.send('Please join a voice channel!');
            if(!args.length) return msg.channel.send('Please provide a search keyword or a url.');

            connection = getVoiceConnection(msg.guild.id);
            if (!connection) {
                connection = joinVoiceChannel({
                    channelId: msg.member.voice.channelId,
                    guildId: msg.guildId,
                    adapterCreator: msg.guild.voiceAdapterCreator,
                });
            }
            
            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query);

                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await videoFinder(args.join(' '));

            if(video){
                const player = createAudioPlayer();
                const stream = ytdl(video.url, {filter: 'audioonly'});
                const resource = createAudioResource(stream);
                player.play(resource, {seek: 0, volume: 1});
                connection.subscribe(player);

                await msg.reply(`Now Playing ***${video.title}***`);
            } else {
                await msg.channel.send('No results found.');
            }
        } 
    },



    {
        name: 'join',
        aliases: [],
        description: 'I will join your voice channel.',
        async execute(client, msg, args) {

            if (!msg.member.voice.channel) return msg.channel.send('Please join a voice channel!');

            try {
                const connection = joinVoiceChannel({
                    channelId: msg.member.voice.channelId,
                    guildId: msg.guildId,
                    adapterCreator: msg.guild.voiceAdapterCreator,
                });

                if (!playingGuilds.get(msg.guildId)) {
                    playingGuilds.set(msg.guildId, {
                        channelId: msg.member.voice.channel,
                        msgChannel: msg.channel,
                        guild: msg.guild,
                        songs: []
                    });
                };
                await msg.react('902096184645124146');
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
            await msg.react('902096184645124146');
        }
    },



    {
        name: 'log',
        aliases: [],
        description: 'debugging command (temporary)',
        async execute(client, msg, args) {

            console.log(playingGuilds.get(msg.guildId));
        }
    }
];