import { Client, CommandInteraction, EmbedBuilder, GuildMember, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import { convertApplicationFlags, convertPermissions, convertPresence, convertUserFlags } from '../../utils/convert.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('userinfo')
                .setDescription('get user information.')
                .addUserOption((option) => option.setName('user').setDescription('user to get information.'))
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            user: interaction.options.get('user')?.value as string | undefined,
        };

        let member: GuildMember | undefined;
        let flags: string | undefined;
        let nickname: string | undefined;
        let roles: string | undefined;
        let presence: string | undefined;

        /**
         * set member = fetch member ?? command invoker
         */
        try {
            member = args.user
                ? await interaction.guild!.members.fetch({
                      user: args.user,
                      withPresences: true,
                  })
                : (interaction.member as GuildMember);
        } catch {
            return await interaction.reply('Invalid user. (user has to be in this server)');
        }

        /**
         * format badges (UserFlags | ApplicationFlags)
         */
        if (member.user.bot) {
            flags = member.user.flags ? await convertApplicationFlags(member.user.flags.bitfield) : 'None';
        } else {
            flags = member.user.flags ? await convertUserFlags(member.user.flags.bitfield) : 'None';
        }

        /**
         * get nickname
         */
        nickname = member.nickname ?? 'None';

        /**
         * format member presence
         */
        presence = member.presence
            ? await convertPresence(member.presence.clientStatus!)
            : 'desktop: <:status_offline:908249115505332234>\nmobile:<:status_offline:908249115505332234>\nweb: <:status_offline:908249115505332234>';

        /**
         * format permissions
         */
        const permissions = await convertPermissions(member.permissions.bitfield);

        /**
         * format roles
         */
        roles = member.roles.highest ? `highest: ${member.roles.highest}\nhoist: ${member.roles.hoist}` : 'None';

        /**
         * format embed
         */
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${member.displayName}'s User Info`,
                iconURL: member.user.displayAvatarURL(Hina.imageOption),
            })
            .setTitle(member.user.tag)
            .setColor(member.user.bot ? Hina.color : (await member.user.fetch(true)).accentColor ?? Hina.color)
            .setThumbnail(member.user.displayAvatarURL({ size: 4096 }))
            .setTimestamp()
            .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
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
                    name: `permissions ${permissions === 'None' ? '' : `[${permissions.length}]`}`,
                    value: `${
                        permissions === 'None' ? permissions : permissions.perms
                    }\n[for more info...](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)`,
                }
            );

        /**
         * return result
         */
        await interaction.reply({ embeds: [embed] });
    }
}
