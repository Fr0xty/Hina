import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
import { Hina } from './res/config.js';
const registerSlashCommands = async (slashCommandProfiles) => {
    const hinaId = '769125937731338290';
    const guildId = '744786416327721050';
    const rest = new REST({ version: '9' }).setToken(Hina.token);
    await rest.put(Routes.applicationGuildCommands(hinaId, guildId), {
        body: slashCommandProfiles,
    });
    console.log('Successfully registered application commands.');
};
const slashCommandProfiles = [];
const loadCommands = async () => {
    const commandCategoryFolders = fs.readdirSync('./dist/commands');
    for (const categoryFolder of commandCategoryFolders) {
        const commandFiles = fs.readdirSync(`./dist/commands/${categoryFolder}`);
        for (const file of commandFiles) {
            const { default: commandClass } = await import(`./commands/${categoryFolder}/${file}`);
            const command = new commandClass();
            Hina.commands.set(command.name, command);
            if (command.aliases) {
                for (const alias of command.aliases) {
                    Hina.commands.set(alias, command);
                }
            }
            if (command.slashCommandProfile)
                slashCommandProfiles.push(command.slashCommandProfile.toJSON());
        }
    }
    console.log('Commands are successfully added!');
};
await loadCommands();
const eventFiles = fs.readdirSync('./dist/events');
eventFiles.forEach(async (eventFile) => {
    await import(`./events/${eventFile}`);
});
console.log('Events are successfully added!');
Hina.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;
    const command = Hina.commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        await command.slashExecute(Hina, interaction);
    }
    catch (err) {
        console.log(err);
    }
});
Hina.on('ready', () => {
    console.log(`Logged in as ${Hina.user.tag}!`);
});
Hina.on('error', async (err) => {
    console.log(err.message);
});
import server from './server/server.js';
server();
Hina.login(Hina.token);
