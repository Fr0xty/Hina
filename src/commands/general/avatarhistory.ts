import 'dotenv/config';
import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

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
        // TODO: reevaluate the code after hinaweb is up again
        return interaction.reply(
            'Avatar history is currently inaccessible, but avatars are still being recorded. Sorry for the inconvenience.'
        );

        // const args = {
        //     user: interaction.options.get('user')?.value as string | undefined,
        // };

        // let targetUser;
        // try {
        //     targetUser = args.user ? await Hina.users.fetch(args.user) : interaction.user;
        // } catch {
        //     return await interaction.reply('Invalid userId!');
        // }

        // const embed = new EmbedBuilder()
        //     .setColor(Hina.color)
        //     .setAuthor({ name: `${targetUser.tag}'s Avatar History`, iconURL: targetUser.displayAvatarURL() })
        //     .setDescription(`see them [HERE](${process.env.HINAWEB_BASE_URL}/api/avatar-history/${targetUser.id})`)
        //     .setFooter({
        //         text: `Requested by ${interaction.user.tag}`,
        //         iconURL: interaction.user.displayAvatarURL(),
        //     })
        //     .setTimestamp();
        // await interaction.reply({ embeds: [embed] });
    }
}
