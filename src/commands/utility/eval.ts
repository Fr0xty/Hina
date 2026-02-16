import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
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

            try {
                await eval(`
                    (async () => {
                        const { default: Hina } = await import('../../res/HinaClient.js');
                        
                        try { ${code?.trim()} }
                        catch (err) { throw err }
                    })();
                `);

                /**
                 * no error & no reply, send success message
                 */
                if (!interaction.replied)
                    await interaction.reply({ content: 'eval ran successfully.', ephemeral: true });
            } catch (err) {
                /**
                 * error thrown in eval
                 */
                if (err instanceof Error) {
                    const errorEmbed = new EmbedBuilder()
                        .setColor(Hina.color)
                        .setTitle('Error')
                        .setFields([
                            { name: 'Name', value: '```' + err.name + '```', inline: false },
                            { name: 'Message', value: '```' + err.message + '```', inline: false },
                            { name: 'Stack', value: '```' + err.stack + '```' ?? 'none', inline: false },
                        ]);

                    await interaction.reply({
                        embeds: [errorEmbed],
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({ content: 'Something went wrong.', ephemeral: true });
                }
            }
        } catch {
            await interaction.reply({ content: 'No code block was provided in the message.', ephemeral: true });
        }
    }
}
