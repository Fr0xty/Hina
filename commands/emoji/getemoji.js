import { MessageEmbed } from 'discord.js';

import { hinaColor, hinaImageOption } from '../../res/config.js';
import { paginator } from '../../utils/paginator.js';


export default {

    name: 'getemoji',
    aliases: [],
    description: 'get all server emoji(s).',





    async execute(client, msg, args) {

        if (!msg.guild.emojis.cache.size) return await msg.reply('The server doesn\'t have any emoji!');
        
        const emojiAmount = msg.guild.emojis.cache.size;
        const pageAmount = Math.ceil(emojiAmount / 20);
        let pages = [];
        let page = '';
        let _ = 0;
        for (const [id, emoji] of msg.guild.emojis.cache.entries()) {

            page += `${emoji}- \`${emoji}\`\n`;
            _++;
            
            if (_ === 20) {
                const embed = new MessageEmbed()
                    .setColor(hinaColor)
                    .setAuthor({name: `${client.user.username} Page ${pages.length + 1} / ${pageAmount}`, iconURL: client.user.displayAvatarURL(hinaImageOption)})
                    .setTitle(`Emoji Id(s) for ${msg.guild.name} [${msg.guild.emojis.cache.size}]`)
                    .setDescription(page)
                    .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
                    .setTimestamp();
                
                pages.push(embed);
                page = '';
                _ = 0;
            };
        };
        if (_)  {
            const embed = new MessageEmbed()
                .setColor(hinaColor)
                .setAuthor({name: `${client.user.username} Page ${pages.length + 1} / ${pageAmount}`, iconURL: client.user.displayAvatarURL(hinaImageOption)})
                .setTitle(`Emoji Id(s) for ${msg.guild.name} [${msg.guild.emojis.cache.size}]`)
                .setDescription(page)
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
                .setTimestamp();

            pages.push(embed);
        }

        await paginator(msg, pages, 120_000);
    },





    async slashExecute(client, interaction) {
        return;
    }
};