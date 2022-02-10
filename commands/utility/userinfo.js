import { MessageEmbed } from 'discord.js';

import { hinaImageOption } from '../../res/config.js';
import { convertFlags, convertPresence, convertPermissions } from '../../utils/convert.js';


export default {

    name: 'userinfo',
    aliases: [],
    description: 'get all user information.',





    async execute(client, msg, args) {

        let member, flags, nickname, roles, presence;

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
            .setAuthor({name: `${member.displayName}'s User Info`, iconURL: member.user.displayAvatarURL(hinaImageOption)})
            .setTitle(member.user.tag)
            .setColor(member.displayHexColor)
            .setThumbnail(member.user.displayAvatarURL({size: 4096, dynamic: true}))
            .setTimestamp()
            .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
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
    },





    async slashExecute(client, interaction) {
        return;
    },
};