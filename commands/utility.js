import { MessageEmbed } from 'discord.js';
import { readFile } from 'fs/promises';
import piston from 'piston-client';

import { hinaColor } from '../res/config.js';
const packageJSON = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));
import { convertSeconds, convertFlags, convertPresence, convertPermissions } from '../utils/convert.js';


export const commands = [
    
    {
        name: 'run',
        aliases: [],
        description: 'Running code snippets in a sandbox.',
        async execute(client, msg, args) {

            let code = args.replaceAll('```', '');
            const lang = code.match(/.+/)[0];
            code = code.replace(/.+/, '');
            await msg.reply(`code: ${code}\nlang: ${lang}`);
            // TODO
            const pistonClient = piston({server: "https://emkc.org"});
            const runtimes = await pistonClient.runtimes();
            const result = await pistonClient.execute(lang, code);
            console.log(result);
            await msg.reply(result);
        }
    },



    {
        name: 'appinfo',
        aliases: [],
        description: 'Get my information!',
        async execute(client, msg, args) {

            const djsVer = packageJSON.dependencies['discord.js'];
            const nodeVer = packageJSON.devDependencies['node'];
            const uptime = await convertSeconds(client.uptime / 1000);
            
            const embed = new MessageEmbed()
                .setDescription(`
discord.js: \`${djsVer}\`
Node JS: \`${nodeVer}\`

bot latency: \`${Date.now() - msg.createdTimestamp}ms\`
websocket latency: \`${Math.round(client.ws.ping)}ms\`
bot uptime: \`${uptime}\`
                `)
                .setAuthor({name: client.user.tag, iconURL: client.user.displayAvatarURL({size:4096})})
                .setColor(hinaColor)
                .setTitle(`Hina's Application Info`)
                .setThumbnail(client.user.displayAvatarURL({size: 4096}))
                .setTimestamp()
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({size: 4096, dynamic: true})});
            await msg.reply({ embeds: [embed] });
        }
    },



    {
        name: 'userinfo',
        aliases: [],
        description: 'get all user information.',
        async execute(client, msg, args) {

            let member, flags, nickname, roles;

            if (args.length == 0) { member = msg.member }
            else { 
                try {
                    member = await msg.guild.members.fetch({user: args[0].match(/[0-9]+/)[0], withPresences: true});
                } catch (e) {
                    await msg.reply('Invalid member! Either the user isn\'t in the server or invalid id / mention.')
                };
            };

            if (member == undefined) return await msg.reply('User does not exist!');

            if (member.user.flags == null) { flags = 'None' }
            else { flags = await convertFlags(member.user.flags.bitfield) };

            if (!member.nickname) { nickname = 'None' }
            else { nickname = member.nickname };
            
            if (!member.presence) { presence = `desktop: <:status_offline:908249115505332234>\nmobile:<:status_offline:908249115505332234>\nweb: <:status_offline:908249115505332234>`}
            else { presence = await convertPresence(member.presence.clientStatus) };
            
            const permissions = await convertPermissions(member.permissions.bitfield);

            if (!member.roles.highest) { roles = 'None' }
            else { roles = `highest: ${member.roles.highest}\nhoist: ${member.roles.hoist}` };


            const embed = new MessageEmbed()
                .setAuthor({name: `${member.displayName}'s User Info`, iconURL: member.user.displayAvatarURL({size: 4096, dynamic: true})})
                .setTitle(member.user.tag)
                .setColor(member.displayHexColor)
                .setThumbnail(member.user.displayAvatarURL({size: 4096, dynamic: true}))
                .setTimestamp()
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({size: 4096, dynamic: true})})
                .addFields(
                    {name: 'nickname', value: nickname, inline: true},
                    {name: 'mention', value: member.toString(), inline: true},

                    {name: 'status', value: presence, inline: true},
                    {name: 'joined at', value: `<t:${Math.round(member.joinedTimestamp / 1000)}>`, inline: true},
                    {name: 'created at', value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`, inline: true},
                    {name: 'badges', value: flags},
                    {name: 'roles', value: roles},
                    {name: `permissions [${permissions.length}]`, value: `${permissions.perms}\n[for more info...](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)`}
                );
            await msg.reply({ embeds: [embed] });
        }
    },



    {
        name: 'epochtime',
        aliases: ['epoch'],
        description: 'get quick example of epochtime in discord.',
        async execute(client, msg, args) {

            const embed = new MessageEmbed()
                .setColor(hinaColor)
                .setAuthor({name: 'Epoch Time Example', iconURL: client.user.displayAvatarURL()})
                .setDescription(`
[Epoch Time Converter](https://www.epochconverter.com/) 

\`<t:1624855717>\` 	    <t:1624855717>	
\`<t:1624855717:f>\` 	<t:1624855717:f>
\`<t:1624855717:F>\` 	<t:1624855717:F>
\`<t:1624855717:d>\` 	<t:1624855717:d>
\`<t:1624855717:D>\` 	<t:1624855717:D>
\`<t:1624855717:t>\` 	<t:1624855717:t>
\`<t:1624855717:T>\` 	<t:1624855717:T>
\`<t:1624855717:R>\` 	<t:1624855717:R>
                `)
                .setFooter({text: `Requested by ${msg.author.tag}さま`, iconURL: msg.author.displayAvatarURL()})
                .setImage('https://cdn.discordapp.com/attachments/907586559719645204/908234637380288552/sheeeeeeeesh.jpeg')
                .setTimestamp();

            await msg.channel.send({ embeds: [embed] });
        }
    },



    {
        name: 'prune',
        aliases: [],
        description: 'bulk delete a certain amount of messages in the channel.',
        async execute(client, msg, args) {

            if (!msg.member.permissions.has('MANAGE_MESSAGES')) return await msg.reply('You don\'t have the permission to use this command!\nrequire: `Manage Messages`');
            
            let num;
            if (!args.length) {
                num = 2;
            } 
            else if (!(args[0] > 0 && args[0] < 1001)) {
                return await msg.reply('Please provide 0 < __num__ < 1001.');
            }
            else { num = args[0]++ };

            await msg.channel.bulkDelete(num);
        }
    },
];