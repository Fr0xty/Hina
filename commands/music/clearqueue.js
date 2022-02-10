import { MessageEmbed } from 'discord.js';

import { hinaColor, hinaImageOption } from '../../res/config.js';
import { guildOrClientIcon } from '../../utils/general.js';


export default {

    name: 'clearqueue',
    aliases: ['clearq'],
    description: 'clear server song queue.',





    async execute(client, msg, args) {
        
        const profile = client.musicGuildProfile.get(msg.guildId);
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
            .setFooter({text: `Queue cleared by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)});
        await msg.reply({ embeds: [embed] });
    },





    async slashExecute(client, interaction) {
        return;
    },
};