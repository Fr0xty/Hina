const { MessageEmbed } = require('discord.js');
const { hinaColor } = require('../res/config');
const pjson = require('../package');
const { convertSeconds, convertFlags, convertPresence, convertPermissions } = require('../utils/convert');


module.exports = [
    
    {
        name: 'run',
        aliases: [],
        description: 'Running code snippets in a sandbox.',
        async execute(client, msg, args) {

            await msg.reply('in progress..');
            return;

            args = args.replaceAll('```', '');
            let lang = args.split('\n')[0];
            args.split('\n').shift();
            
            const pistonClient = piston({server: "https://emkc.org"});
            const runtimes = await pistonClient.runtimes();
            const result = await pistonClient.execute(lang, args);
            await msg.reply(result);
        }
    },



    {
        name: 'appinfo',
        aliases: [],
        description: 'Get my information!',
        async execute(client, msg, args) {

            const djsVer = pjson.dependencies['discord.js'];
            const nodeVer = pjson.devDependencies['node'];
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
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({size:4096})});
            await msg.reply({ embeds: [embed] });
        }
    },



    {
        name: 'userinfo',
        aliases: [],
        description: 'get all user information',
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

            if (member == undefined) return msg.reply('User does not exist!');

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
                .setAuthor({name: `${member.displayName}'s User Info`, iconURL: member.user.displayAvatarURL({size:4096})})
                .setTitle(member.user.tag)
                .setColor(member.displayHexColor)
                .setThumbnail(member.user.displayAvatarURL({size:4096}))
                .setTimestamp()
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({size:4096})})
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

];