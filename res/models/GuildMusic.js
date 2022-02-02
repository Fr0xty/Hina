const {
    joinVoiceChannel,
    getVoiceConnection,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
} = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');

const { hinaColor } = require('../config');


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
        const embed = new MessageEmbed()
            .setAuthor({name: this._client.user.username, iconURL: this._client.user.displayAvatarURL()})
            .setColor(hinaColor)
            .setTitle('Now Playing:')
            .setDescription(`[${this.songs[0].videoInfo.videoDetails.title}](${this.songs[0].videoInfo.videoDetails.url})`)
            .setThumbnail(this.songs[0].videoInfo.videoDetails.thumbnails.at(-1).url);
        this.mc.send({ embeds: [embed] });
    };



    async _songAddAnnounce() {
        const embed = new MessageEmbed()
            .setAuthor({name: this._client.user.username, iconURL: this._client.user.displayAvatarURL()})
            .setColor(hinaColor)
            .setTitle('Song Added to Queue!')
            .setDescription(`[${this.songs.at(-1).videoInfo.videoDetails.title}](${this.songs.at(-1).videoInfo.videoDetails.url})`)
            .setThumbnail(this.songs.at(-1).videoInfo.videoDetails.thumbnails.at(-1).url);
        this.mc.send({ embeds: [embed] });
    };



    async _noSongAnnounce() {
        const embed = new MessageEmbed()
            .setAuthor({name: this._client.user.username, iconURL: this._client.user.displayAvatarURL()})
            .setColor(hinaColor)
            .setTitle('No songs left in queue!')
            .setDescription('Use `hina play <url / search keywords>` to add more songs to queue!');
            
        await this.mc.send({ embeds: [embed] });
    }



    async updateChannels(vc, mc) {
        this.vc = vc;
        this.mc = mc;
    };



    async addSong(resource, videoInfo) {
        this.songs.push({
            resource: resource,
            videoInfo: videoInfo,
        });
        await this._songAddAnnounce();
        if (this.songs.length === 1) await this._playStart();
    };
}

module.exports = {
    GuildMusic: GuildMusic,
};