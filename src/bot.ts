import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';

import { Hina, token } from './res/config.js';

/**
 * register slash commands
 */
const registerSlashCommands = async (slashCommandProfiles: Object) => {
    const hinaId = '769125937731338290';
    const guildId = '744786416327721050';

    const rest = new REST({ version: '9' }).setToken(token!);

    await rest.put(Routes.applicationGuildCommands(hinaId, guildId), {
        body: slashCommandProfiles,
    });
    console.log('Successfully registered application commands.');
};

/**
 * loading commands
 */
const slashCommandProfiles: SlashCommandBuilder[] = [];

const loadCommands = async () => {
    // folder: [emoji, fun, general...]
    const commandCategoryFolders = fs.readdirSync('./dist/commands');
    for (const categoryFolder of commandCategoryFolders) {
        // file: [getemoji.js, reactemoji.js...]
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
            if (command.slashCommandProfile) slashCommandProfiles.push(command.slashCommandProfile.toJSON());
        }
    }
    console.log('Commands are successfully added!');
};

await loadCommands();
// await registerSlashCommands(slashCommandProfiles);

/**
 * loading event handlers
 */
const eventFiles = fs.readdirSync('./dist/events');
eventFiles.forEach(async (eventFile) => {
    await import(`./events/${eventFile}`);
});
console.log('Events are successfully added!');

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

/**
 * online alert
 */
Hina.on('ready', () => {
    console.log(`Logged in as ${Hina.user!.tag}!`);
});

/**
 * run express server to keep alive on replit
 */
import server from './server.js';
server();

/**
 * login into bot
 */
Hina.login(token);
