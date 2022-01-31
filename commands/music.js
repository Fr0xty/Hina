const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');



module.exports = [

    {
        name: 'play',
        aliases: [],
        description: 'Add music to queue.',
        async execute(client, message, args) {

            if (!message.member.voice.channel) return msg.channel.send('Please join a voice channel!');
            if(!args.length) return message.channel.send('Please provide a search keyword or a url.');

            const connection = getVoiceConnection(msg.guild.id);
            if (!connection) {
                const connection = joinVoiceChannel({
                    
                })
            } 

            const voiceChannel = message.member.voice.channel;
            if(!voiceChannel) return message.channel.send('Not in a vc');
            if(!args.length) return message.channel.send('Invalid Input. Missing second argument.')

            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query);

                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await videoFinder(args.join(' '));

            if(video){
                const stream = ytdl(video.url, {filter: 'audioonly'})
                connection.play(stream, {seek: 0, volume: 1})
                .on('fnish', () =>{
                    voiceChannel.leave();
                });

                await message.reply(`Now Playing ***${video.title}***`)
            } else {
                message.channel.send('No results found.');
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
                    channelId: msg.member.voice.channel.id,
                    msgChannel: msg.channel,
                    guildId: msg.guild.id,
                    songs: [],
                    adapterCreator: msg.guild.voiceAdapterCreator
                });
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
        }
    },



    {
        name: 'info',
        aliases: [],
        description: 'debugging command (temporary)',
        async execute(client, msg, args) {

            const connection = getVoiceConnection(msg.guild.id);
            await msg.channel.send(connection.channelId);
        }
    }
];