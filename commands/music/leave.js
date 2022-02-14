import { getVoiceConnection } from '@discordjs/voice';

import { okEmoji } from '../../res/config.js';


export default {

    name: 'leave',
    aliases: [],
    description: 'I will leave your voice channel.',





    async execute(Hina, msg, args) {
        
        const connection = getVoiceConnection(msg.guild.id);
        if (!connection) return await msg.reply('I\'m not currently playing in this server!');

        connection.destroy();
        Hina.musicGuildProfile.delete(msg.guildId);
        await msg.react(okEmoji);
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};