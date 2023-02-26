import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import { extractCodeBlock } from '../../utils/general.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('eval')
                .setDescription('owner only command.')
                .addStringOption((option) =>
                    option.setName('message_id').setDescription('message id of code block.').setRequired(true)
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            message_id: interaction.options.get('message_id')!.value as string,
        };

        /**
         * allow access to only owner
         */
        if (interaction.user.id !== Hina.owner.id) {
            return await interaction.reply({ content: 'You have no permission to use this command.', ephemeral: true });
        }

        try {
            const msgContent = (await interaction.channel?.messages.fetch(args.message_id))!.content;
            const { code } = await extractCodeBlock(msgContent);

            eval(`
                (async () => {
                    const { default: Hina } = await import('../../res/HinaClient.js');

                    try {
                        ${code?.trim()}
                    } catch (err) {
                        return await interaction.reply({ content: err.message, ephemeral: true });
                    }
                })()
            `);

            try {
                await interaction.reply({ content: 'eval ran successfully.', ephemeral: true });
            } catch {}
        } catch {
            await interaction.reply({ content: 'No code block was provided in the message.', ephemeral: true });
        }
    }
}
