import { EmbedBuilder } from 'discord.js';
import Hina from '../res/HinaClient.js';

/**
 * slash command handler
 */
Hina.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    /**
     * search for command
     */
    const command = Hina.commands.get(interaction.commandName);
    if (!command) return;

    /**
     * execute
     */
    try {
        await command.slashExecute(Hina, interaction);
    } catch (err) {
        await interaction.reply({
            content: 'Sorry, something went wrong. Problem has been reported to the developer.',
            ephemeral: true,
        });

        /**
         * report bug
         */
        const embed = new EmbedBuilder().setColor(16751772).setTitle('Encountered Bug').setDescription(`
Command:
\`\`\`
${interaction.commandName}
\`\`\`

Error:
\`\`\`
${(err as Error).message}
\`\`\`
        `);

        await Hina.owner.send({ embeds: [embed] });
    }
});
