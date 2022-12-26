import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('reactemoji')
                .setDescription('react to message using the emoji id.')
                .addStringOption((option) =>
                    option
                        .setName('message_id')
                        .setDescription('message id of the message to react to.')
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName('emoji_id')
                        .setDescription(
                            'emoji id of the emoji to react with (use /getemoji command) e.g.: <:Hmm:885845962310963270>'
                        )
                        .setRequired(true)
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            message_id: interaction.options.get('message_id')!.value as string,
            emoji_id: interaction.options.get('emoji_id')!.value as string,
        };

        try {
            /**
             * get Message object to react to
             */
            const messageToReact = await interaction.channel!.messages.fetch(args.message_id);

            /**
             * react with emoji, reply with error response if emoji_id give is invalid
             */
            try {
                await messageToReact.react(args.emoji_id);
            } catch {
                return await interaction.reply({ content: `Invalid emoji id: ${args.emoji_id}`, ephemeral: true });
            }

            /**
             * affirmation response
             */
            const embed = new EmbedBuilder()
                .setDescription(
                    `
Successfully reacted with: ${args.emoji_id}
Message [**HERE**](${messageToReact.url})`
                )
                .setColor(Hina.color);

            return await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        } catch {
            /**
             * cannot find message with given id, return immediately
             */
            return await interaction.reply({
                content: 'Invalid message id provided, the message has to be in this channel.',
                ephemeral: true,
            });
        }
    }
}
