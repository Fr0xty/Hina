import { paginator } from '../../utils/paginator.js';


export default {

    name: 'queue',
    aliases: ['q'],
    description: 'get song queue of the server.',





    async execute(client, msg, args) {

        const profile = client.musicGuildProfile.get(msg.guildId);
        if (!profile) return await msg.reply('I\'m not currently playing in this server!');
        if (!profile.songs.length) return await msg.reply('There is no songs in queue currently.');

        await profile.updateChannels(null, msg.channel);
        const pages = await profile.getQueue();
        await paginator(msg, pages, 120_000);
    },





    async slashExecute(client, interaction) {
        return;
    },
};