export default {

    eventName: 'interactionCreate',
    callback: async (interaction) => {

        return;
        // TODO implement one after slash commands are in place.
        if (!interaction.isCommand()) return;

        try {
            result = Discord.commands.get(interaction.commandName).executeSlash(interaction);
        }
        catch (err) {
            console.log(err);
        }

    }
}