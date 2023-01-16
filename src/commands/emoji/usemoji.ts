import {
    Client,
    CommandInteraction,
    EmbedBuilder,
    GuildMember,
    GuildTextBasedChannel,
    NewsChannel,
    SlashCommandBuilder,
    TextChannel,
    ThreadChannel,
    VoiceBasedChannel,
    VoiceChannel,
} from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('usemoji')
                .setDescription('use any emojis including animated ones.')
                .addStringOption((option) =>
                    option
                        .setName('emoji_id')
                        .setDescription('emoji id to use. (use /getemoji command)')
                        .setRequired(true)
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            emoji_id: interaction.options.get('emoji_id')!.value as string,
        };

        if (interaction.channel?.isDMBased() || interaction.channel?.isThread()) return;
        const webhook = await (interaction.channel as TextChannel | NewsChannel | VoiceChannel).createWebhook({
            name: (interaction.member as GuildMember).displayName,
            avatar: (interaction.member as GuildMember).displayAvatarURL(Hina.imageOption),
        });
        const resultMsg = await webhook.send(args.emoji_id);
        await webhook.delete();

        /**
         * affirmation response
         */
        const embed = new EmbedBuilder()
            .setDescription(
                `
Successfully used: ${args.emoji_id}
Message [**HERE**](${resultMsg.url})`
            )
            .setColor(Hina.color);

        return await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    }
}
