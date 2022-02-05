import { MessageEmbed } from 'discord.js';

import { hinaColor, okEmoji } from '../res/config.js';
import { paginator } from '../utils/paginator.js';


export const commands = [

    {
        name: 'getemoji',
        aliases: [],
        description: 'get all server emoji(s)',
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
                        .setAuthor({name: `${client.user.username} Page ${pages.length + 1} / ${pageAmount}`, iconURL: client.user.displayAvatarURL({size: 4096})})
                        .setTitle(`Emoji Id(s) for ${msg.guild.name} [${msg.guild.emojis.cache.size}]`)
                        .setDescription(page)
                        .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({size: 4096, dynamic: true})})
                        .setTimestamp();
                    
                    pages.push(embed);
                    page = '';
                    _ = 0;
                };
            };
            if (_)  {
                const embed = new MessageEmbed()
                    .setColor(hinaColor)
                    .setAuthor({name: `${client.user.username} Page ${pages.length + 1} / ${pageAmount}`, iconURL: client.user.displayAvatarURL({size: 4096})})
                    .setTitle(`Emoji Id(s) for ${msg.guild.name} [${msg.guild.emojis.cache.size}]`)
                    .setDescription(page)
                    .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({size: 4096, dynamic: true})})
                    .setTimestamp();

                pages.push(embed);
            }

            await paginator(msg, pages, 120_000);
        }
    },



    {
        name: 'usemoji',
        aliases: [],
        description: 'send the emoji as you!',
        async execute(client, msg, args) {

            const emojiRegex = /^a?:.+:([0-9]{18})$/;

            if (!emojiRegex.test(args[0])) return await msg.reply('Invalid emoji id! Please make sure to copy the whole emoji id without the angle brackets.');
            else {
                const webhook = await msg.channel.createWebhook(msg.member.displayName, {
                    avatar: msg.author.displayAvatarURL({size: 4096, dynamic: true}),
                });

                await webhook.send(`<${args}>`);
                await webhook.delete();
                await msg.delete();
            };
        }
    },



    {
        name: 'reactemoji',
        aliases: [],
        description: 'react to messages using the emoji.',
        async execute(client, msg, args) {

            if (!msg.reference) return await msg.reply('Please reply to the message you want to react to while using the command!');
            if (!args) return await msg.reply('Please provide the emoji id.');

            const theMsg = await msg.fetchReference();
            
            try { 
                await theMsg.react(args[0]);
                await msg.delete();
            }
            catch { await msg.reply(`Invalid emoji id: ${args[0]}`)};
        }
    },
];