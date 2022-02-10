import { getVoiceConnection } from '@discordjs/voice';

import { okEmoji } from '../../res/config.js';


export default {

    name: 'leave',
    aliases: [],
    description: 'I will leave your voice channel.',





    async execute(client, msg, args) {
        
        const connection = getVoiceConnection(msg.guild.id);
        if (!connection) return await msg.reply('I\'m not currently playing in this server!');

        connection.destroy();
        client.musicGuildProfile.delete(msg.guildId);
        await msg.react(okEmoji);
    },





    async slashExecute(client, interaction) {
        return;
    },
};