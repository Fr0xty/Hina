import {
    Client,
    CommandInteraction,
    EmbedBuilder,
    GuildMember,
    NewsChannel,
    SlashCommandBuilder,
    TextChannel,
    VoiceChannel,
} from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('act')
                .setDescription('act as someone to say dumb things.')
                .addUserOption((option) =>
                    option.setName('user').setDescription('the person to impersonate.').setRequired(true)
                )
                .addStringOption((option) => option.setName('message').setDescription('text to say.').setRequired(true))
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            user: interaction.options.get('user')!.value as string | GuildMember,
            message: interaction.options.get('message')!.value as string,
        };

        /**
         * cannot create webhook in these channels
         */
        if (interaction.channel?.isDMBased() || interaction.channel?.isThread()) {
            return interaction.reply({
                content: 'This command cannot be used in thread / dm channels.',
                ephemeral: true,
            });
        }

        /**
         * fetch user safely
         */
        try {
            const temp = await interaction.guild?.members.fetch(interaction.options.get('user')!.value as string);
            if (temp === undefined) throw new Error();

            args.user = temp;
        } catch {
            return interaction.reply({ content: 'Invalid user.', ephemeral: true });
        }

        /**
         * send the message
         */
        const webhook = await (interaction.channel as TextChannel | NewsChannel | VoiceChannel).createWebhook({
            name: args.user.displayName,
            avatar: args.user.displayAvatarURL(Hina.imageOption),
        });
        const resultMsg = await webhook.send(args.message);
        await webhook.delete();

        /**
         * affirmation response
         */
        const embed = new EmbedBuilder()
            .setDescription(
                `
Successfully sent.
Message [**HERE**](${resultMsg.url})`
            )
            .setColor(Hina.color);

        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    }
}
