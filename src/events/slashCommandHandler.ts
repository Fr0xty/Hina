import Hina from '../res/HinaClient.js';

/**
 * slash command handler
 */
Hina.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = Hina.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.slashExecute(Hina, interaction);
    } catch (err) {
        console.log(err);
    }
});
