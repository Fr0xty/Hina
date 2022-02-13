import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import Discord, { Client, Intents } from 'discord.js';
import fs from 'fs';

import { prefix, token } from './res/config.js';

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ] 
});




// for music commands: to store guild info
client.musicGuildProfile = new Map();



// register slash commands
const registerSlashCommands = async (slashCommandProfiles) => {

    const clientId = '769125937731338290';
    const guildId = '744786416327721050';

    const rest = new REST({ version: '9' }).setToken(token);


    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommandProfiles });
    console.log('Successfully registered application commands.');
};



// loading commands
client.commands = new Discord.Collection();
const slashCommandProfiles = [];

const loadCommands = async () => {

    // folder: [emoji, fun, general...]
    const commandCategoryFolders = fs.readdirSync('./commands');
    for (const categoryFolder of commandCategoryFolders) {
        
        // file: [getemoji.js, reactemoji.js...]
        const commandFiles = fs.readdirSync(`./commands/${categoryFolder}`);
        for (const file of commandFiles) {

            const command = await import(`./commands/${categoryFolder}/${file}`);
            client.commands.set(command.default.name, command.default);

            if (command.default.slashCommandProfile) {
                slashCommandProfiles.push(command.default.slashCommandProfile.toJSON());
            };
        };
    };
    console.log('Commands are successfully added!');
};


await loadCommands();
await registerSlashCommands(slashCommandProfiles);










// loading event handlers
const eventFiles = fs.readdirSync('./events');
eventFiles.forEach(async eventFile => {

    const event = await import(`./events/${eventFile}`);
    client.on(event.default.eventName, event.default.callback);
});
console.log('Events are successfully added!');




// command handler
client.on('messageCreate', async msg => {

    if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot) return;

    const noPrefixMsg = msg.content.slice(prefix.length).trim();

    try {
        if (noPrefixMsg.match(/^[a-zA-Z]+/)[0] === 'run') {
            var command = 'run';
            var args = noPrefixMsg.slice(command.length);
        }
        else {
            var args = noPrefixMsg.split(/ +/);
            var command = args.shift().toLowerCase();
        }
    }
    catch { 
        msg.channel.send('Invalid command call!');
    }
    finally {
        try {
            let theCommand = client.commands.get(command)

            if (!theCommand) {
                for (const [key, value] of client.commands) {
                    if (value.aliases.includes(command)) theCommand = client.commands.get(key);
                };
            }
            if (!theCommand) return await msg.channel.send('No such command found!');            
            
            await theCommand.execute(client, msg, args);
        }
        catch (e) {
            console.log(e);
        };
    };
});




// slash command handler
client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.slashExecute(client, interaction);
    }
    catch (err) {
        console.log(err);
    }
    
});





// online alert
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});




import server from './server.js';
server();

client.login(token);