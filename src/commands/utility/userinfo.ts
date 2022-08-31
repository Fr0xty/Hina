import { Client, Message, EmbedBuilder } from 'discord.js';

import CommandArgument from '../../res/models/CommandArgument.js';
import { BaseCommand } from 'hina';
import { convertFlags, convertPermissions, convertPresence } from '../../utils/convert.js';

export default class userinfo implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'userinfo';
        this.description = 'get all user information.';
        this.commandUsage = '[@user/user_id]';
        this.args = [
            new CommandArgument({ optional: true })
                .setName('user')
                .setDescription('user to get info on.')
                .setRegex(/^(<@)?!?[0-9]{18}>?$/),
        ];
    }

    async execute(Hina: Client, msg: Message, args: string[]) {
        const [givenMember] = args;

        let member, flags, nickname, roles, presence;

        try {
            member = givenMember
                ? await msg.guild!.members.fetch({ user: givenMember.match(/[0-9]+/)![0], withPresences: true })
                : msg.member;
        } catch {
            await msg.reply("Invalid member! Either the user isn't in the server or invalid id / mention.");
        }

        if (member == undefined) return await msg.reply('User does not exist!');

        if (member.user.flags == null) {
            flags = 'None';
        } else {
            flags = await convertFlags(member.user.flags.bitfield);
        }

        if (!member.nickname) {
            nickname = 'None';
        } else {
            nickname = member.nickname;
        }

        if (!member.presence) {
            presence = `desktop: <:status_offline:908249115505332234>\nmobile:<:status_offline:908249115505332234>\nweb: <:status_offline:908249115505332234>`;
        } else {
            presence = await convertPresence(member.presence.clientStatus!);
        }

        const permissions = await convertPermissions(member.permissions.bitfield);

        if (!member.roles.highest) {
            roles = 'None';
        } else {
            roles = `highest: ${member.roles.highest}\nhoist: ${member.roles.hoist}`;
        }

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${member.displayName}'s User Info`,
                iconURL: member.user.displayAvatarURL(Hina.imageOption),
            })
            .setTitle(member.user.tag)
            .setColor(member.displayHexColor)
            .setThumbnail(member.user.displayAvatarURL({ size: 4096 }))
            .setTimestamp()
            .setFooter({
                text: `Requested by: ${msg.author.tag}`,
                iconURL: msg.author.displayAvatarURL(Hina.imageOption),
            })
            .addFields(
                { name: 'nickname', value: nickname, inline: true },
                { name: 'mention', value: member.toString(), inline: true },

                { name: 'status', value: presence, inline: true },
                { name: 'joined at', value: `<t:${Math.round(member.joinedTimestamp! / 1000)}>`, inline: true },
                { name: 'created at', value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`, inline: true },
                { name: 'badges', value: flags },
                { name: 'roles', value: roles },
                {
                    name: `permissions [${permissions.length}]`,
                    value: `${
                        // @ts-ignore
                        permissions.perms ? permissions.perms : permissions
                    }\n[for more info...](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)`,
                }
            );
        await msg.reply({ embeds: [embed] });
    }
}
