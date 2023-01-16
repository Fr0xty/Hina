import 'dotenv/config';
import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('avatarhistory')
                .setDescription('get avatar history of a user.')
                .addUserOption((option) =>
                    option.setName('user').setDescription('the user to fetch their avatar history.')
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            user: interaction.options.get('user')?.value as string | undefined,
        };

        /**
         * determine user
         */
        let targetUser;
        try {
            targetUser = args.user ? await Hina.users.fetch(args.user) : interaction.user;
        } catch {
            return await interaction.reply('Invalid userId!');
        }

        /**
         * return result
         */
        const embed = new EmbedBuilder()
            .setColor(Hina.color)
            .setAuthor({ name: `${targetUser.tag}'s Avatar History`, iconURL: targetUser.displayAvatarURL() })
            .setDescription(`see them [HERE](${process.env.HINAWEB_BASE_URL}/avatar-history/${targetUser.id})`)
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
