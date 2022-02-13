import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

import { hinaColor, hinaImageOption } from '../../res/config.js';
import { paginator, interactionPaginator } from '../../utils/paginator.js';


export default {

    name: 'getemoji',
    aliases: [],
    description: 'get all server emoji(s).',





    async execute(client, msg, args) {

        let guild;
        if (!args.length) { guild = msg.guild }
        else {
            try { guild = await client.guilds.fetch(args[0]) }
            catch { return await msg.reply('Invalid server id / I\'m not in the server.') };
        };
        
        let guildEmoji;
        try {
            guildEmoji = await guild.emojis.fetch();
        }catch {
            return await msg.reply('I\'m not in the server!')
        };
        const emojiAmount = guildEmoji.size;
        if (!emojiAmount) return await msg.reply('The server doesn\'t have any emoji!');
        
        const pageAmount = Math.ceil(emojiAmount / 20);
        let pages = [];
        let page = '';
        let _ = 0;
        for (const [id, emoji] of guildEmoji.entries()) {

            page += `${emoji}- \`${emoji}\`\n`;
            _++;
            
            if (_ === 20) {
                const embed = new MessageEmbed()
                    .setColor(hinaColor)
                    .setAuthor({name: `${client.user.username} Page ${pages.length + 1} / ${pageAmount}`, iconURL: client.user.displayAvatarURL(hinaImageOption)})
                    .setTitle(`Emoji Id(s) for ${guild.name} [${emojiAmount}]`)
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
                .setTitle(`Emoji Id(s) for ${guild.name} [${emojiAmount}]`)
                .setDescription(page)
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
                .setTimestamp();

            pages.push(embed);
        }

        await paginator(msg, pages, 120_000);
    },





    slashCommandProfile: new SlashCommandBuilder()
        .setName('getemoji')
        .setDescription('get all server emoji(s).')
	    .addStringOption(option => 
            option
                .setName('server_id')
                .setDescription('Server id of the emoji hosting server.')
                .setRequired(false)
        ),




    async slashExecute(client, interaction) {
        
        let guild;
        const serverId = interaction.options.get('server_id');
        if (!serverId) { guild = interaction.guild }
        else {
            try { guild = await client.guilds.fetch(serverId.value) }
            catch { return await interaction.reply('Invalid server id / I\'m not in the server.') };
        };
        

        let guildEmoji;
        try {
            guildEmoji = await guild.emojis.fetch();
        }catch {
            return await interaction.reply('I\'m not in the server!')
        };
        const emojiAmount = guildEmoji.size;
        if (!emojiAmount) return await interaction.reply('The server doesn\'t have any emoji!');
        
        const pageAmount = Math.ceil(emojiAmount / 20);
        let pages = [];
        let page = '';
        let _ = 0;
        for (const [id, emoji] of guildEmoji.entries()) {

            page += `${emoji}- \`${emoji}\`\n`;
            _++;
            
            if (_ === 20) {
                const embed = new MessageEmbed()
                    .setColor(hinaColor)
                    .setAuthor({name: `${client.user.username} Page ${pages.length + 1} / ${pageAmount}`, iconURL: client.user.displayAvatarURL(hinaImageOption)})
                    .setTitle(`Emoji Id(s) for ${guild.name} [${emojiAmount}]`)
                    .setDescription(page)
                    .setFooter({text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.member.displayAvatarURL(hinaImageOption)})
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
                .setTitle(`Emoji Id(s) for ${guild.name} [${emojiAmount}]`)
                .setDescription(page)
                .setFooter({text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.member.displayAvatarURL(hinaImageOption)})
                .setTimestamp();

            pages.push(embed);
        }

        await interactionPaginator(interaction, pages, 120_000);
    }
};