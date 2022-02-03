const {
    joinVoiceChannel,
    getVoiceConnection,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
} = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');

const { hinaColor } = require('../config');
const { guildOrClientIcon } = require('../../utils/general');
const { convertSeconds } = require('../../utils/convert');


class GuildMusic {

    constructor(client, vc, mc) {
        this._client = client;
        this.vc = vc;
        this.mc = mc;
        this.songs = [];
        this.loop = false;
        this.player = createAudioPlayer();
        this.connection = getVoiceConnection(vc.guildId).subscribe(this.player);
    };



    async _playStart() {
        this.player.play(this.songs[0].resource, {seek: 0, volume: .5});
        await this._nowPlayingAnnounce();
        
        this.player.on(AudioPlayerStatus.Idle, async () => {
            await this._playLoop();
        });
    };



    async _playLoop() {
        this.songs.shift();
        if (!this.songs.length) return await this._noSongAnnounce();
        
        this.player.play(this.songs[0].resource, {seek: 0, volume: .5});
        await this._nowPlayingAnnounce();

        this.player.on(AudioPlayerStatus.Idle, async () => {
            await this._playLoop();
        });
    };



    async _nowPlayingAnnounce() {
        const authorIcon = await guildOrClientIcon(this._client, this.vc.guild);
        const npSongInfo = this.songs[0].videoInfo;
        const likes = String(npSongInfo.videoDetails.likes) || 'Hidden';

        const embed = new MessageEmbed()
            .setAuthor({name: `${this.vc.guild.name} Music Queue`, iconURL: authorIcon})
            .setColor(hinaColor)
            .setTitle('Now Playing:')
            .setDescription(`[${npSongInfo.videoDetails.title}](${npSongInfo.videoDetails.video_url})`)
            .addFields(
                {name: 'Length', value: await convertSeconds(npSongInfo.videoDetails.lengthSeconds), inline: true},
                {name: 'Channel Owner', value: `[${npSongInfo.videoDetails.author.name}](${npSongInfo.videoDetails.author.channel_url})`, inline: true},
                {name: 'Likes', value: likes},
                {name: 'Views', value: npSongInfo.videoDetails.viewCount, inline: true},
            )
            .setThumbnail(npSongInfo.videoDetails.thumbnails.at(-1).url);
        this.mc.send({ embeds: [embed] });
    };



    async _songAddAnnounce() {
        const authorIcon = await guildOrClientIcon(this._client, this.vc.guild);

        const embed = new MessageEmbed()
            .setAuthor({name: `${this.vc.guild.name} Music Queue`, iconURL: authorIcon})
            .setColor(hinaColor)
            .setTitle('Song Added to Queue!')
            .setDescription(`[${this.songs.at(-1).videoInfo.videoDetails.title}](${this.songs.at(-1).videoInfo.videoDetails.video_url})`)
            .setThumbnail(this.songs.at(-1).videoInfo.videoDetails.thumbnails.at(-1).url);
        this.mc.send({ embeds: [embed] });
    };



    async _noSongAnnounce() {
        const authorIcon = await guildOrClientIcon(this._client, this.vc.guild);

        const embed = new MessageEmbed()
            .setAuthor({name: `${this.vc.guild.name} Music Queue`, iconURL: authorIcon})
            .setColor(hinaColor)
            .setTitle('No songs left in queue!')
            .setDescription('Use `hina play <url / search keywords>` to add more songs to queue!');
            
        await this.mc.send({ embeds: [embed] });
    }



    async updateChannels(vc, mc) {
        if (vc) this.vc = vc;
        if (mc) this.mc = mc;
    };



    async addSong(resource, videoInfo) {
        let firstTime = false;
        if (!this.songs.length) firstTime = true;

        this.songs.push({
            resource: resource,
            videoInfo: videoInfo,
        });
        await this._songAddAnnounce();
        if (firstTime && this.player.state.status === 'idle') await this._playStart();
    };



    async getQueue() {
        // no songs
        if (!this.songs.length) return null;

        const authorIcon = await guildOrClientIcon(this._client, this.vc.guild);
        const npSongThumbnail = this.songs[0].videoInfo.videoDetails.thumbnails.at(-1).url;

        let page = `**Now Playing:**\n[${this.songs[0].videoInfo.videoDetails.title}](${this.songs[0].videoInfo.videoDetails.video_url}) \`${await convertSeconds(this.songs[0].videoInfo.videoDetails.lengthSeconds)}\`\n\n`;
        let pages = [];

        // only 1 song
        if (this.songs.length === 1) page += '*no more songs left in queue!*';

        // more than 1 song
        for (let i = 1; i < this.songs.length; i++) {
            const videoTitle = this.songs[i].videoInfo.videoDetails.title;
            const videoURL = this.songs[i].videoInfo.videoDetails.video_url;
            const videoLength = await convertSeconds(this.songs[i].videoInfo.videoDetails.lengthSeconds);

            page += `**${i + 1}.** [${videoTitle}](${videoURL}) \`${videoLength}\`\n`;

            if (!(i % 10)) {
                const embed = new MessageEmbed()
                    .setAuthor({name: `${this.vc.guild.name} Music Queue`, iconURL: authorIcon})
                    .setColor(hinaColor)
                    .setDescription(page)
                    .setThumbnail(npSongThumbnail);

                pages.push(embed);
                page = '';
            };
        };
        if (page) {
            const embed = new MessageEmbed()
                .setAuthor({name: `${this.vc.guild.name} Music Queue`, iconURL: authorIcon})
                .setColor(hinaColor)
                .setDescription(page)
                .setThumbnail(npSongThumbnail);

            pages.push(embed);
        };
        return pages;
    };



    async clearQueue() {
        if (this.songs.length === 0) return;

        this.songs = [];
    };
};



module.exports = {
    GuildMusic: GuildMusic,
};