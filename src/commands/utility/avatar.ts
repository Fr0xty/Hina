import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('avatar')
                .setDescription('get user profile avatar.')
                .addUserOption((option) =>
                    option.setName('user').setDescription('user to get profile avatar of. Defaults to yourself.')
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            user: interaction.options.get('user')?.value as string | User | undefined,
        };

        /**
         * fetch user if provided, else assign to command invoker
         */
        try {
            args.user = args.user ? await Hina.users.fetch(args.user) : interaction.user;
        } catch {
            return await interaction.reply({ content: 'Invalid user.', ephemeral: true });
        }

        /**
         * format embed
         */
        const embed = new EmbedBuilder()
            .setColor(Hina.color)
            .setAuthor({ name: "Hina's Avatar Fetcher", iconURL: Hina.user!.displayAvatarURL(Hina.imageOption) })
            .setTitle(`${args.user.tag}'s Avatar'`)
            .setDescription(
                `
[\`webp\`](${args.user.displayAvatarURL({
                    extension: 'webp',
                    size: 4096,
                })}) [\`png\`](${args.user.displayAvatarURL({
                    extension: 'png',
                    size: 4096,
                })}) [\`jpg\`](${args.user.displayAvatarURL({
                    extension: 'jpg',
                    size: 4096,
                })}) [\`jpeg\`](${args.user.displayAvatarURL({
                    extension: 'jpeg',
                    size: 4096,
                })})
            `
            )
            .setImage(args.user.displayAvatarURL(Hina.imageOption))
            .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
            })
            .setTimestamp();

        /**
         * return result
         */
        await interaction.reply({ embeds: [embed] });
    }
}
