import 'dotenv/config';
import fs from 'fs';
import { SlashCommandBuilder } from 'discord.js';

import registerSlashCommands from './utils/registerSlashCommands.js';
import Hina from './res/HinaClient.js';

/**
 * loading commands
 */
const slashCommandBuilders: SlashCommandBuilder[] = [];

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

            // if (command.aliases) {
            //     for (const alias of command.aliases) {
            //         Hina.commands.set(alias, command);
            //     }
            // }

            slashCommandBuilders.push(command.slashCommandBuilder);
        }
    }
    console.log('Commands are successfully added!');
};

await loadCommands();
if (process.env.REGISTER_SLASH_COMMANDS) await registerSlashCommands(slashCommandBuilders);

/**
 * loading event handlers
 */
const eventFiles = fs.readdirSync('./dist/events');
eventFiles.forEach(async (eventFile) => {
    await import(`./events/${eventFile}`);
});
console.log('Events are successfully added!');

/**
 * serve hinaweb
 */
import './server/server.js';

/**
 * login into bot
 */
Hina.login(Hina.token!);
