import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import Discord, { Client, Intents } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
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


// loading commands
client.commands = new Discord.Collection();

// folder: [emoji, fun, general...]
fs.readdir('./commands', (err, commandCategoryFolders) => {
    commandCategoryFolders.forEach(categoryFolder => {
        
        // file: [getemoji.js, reactemoji.js...]
        fs.readdir(`./commands/${categoryFolder}`, (err, commandFiles) => {
            commandFiles.forEach(async file => {
                
                const command = await import(`./commands/${categoryFolder}/${file}`);
                client.commands.set(command.default.name, command.default);
            });
        });
    });
});
console.log('Commands are successfully added!');




// loading event handlers
fs.readdir('./events', (err, eventFiles) => {
    eventFiles.forEach(async eventFile => {

        const event = await import(`./events/${eventFile}`);
        client.on(event.default.eventName, event.default.callback);
    });
});
console.log('Events are successfully added!');




/*
// register slash commands
const clientId = '769125937731338290';
const guildId = '744786416327721050';

const rest = new REST({ version: '9' }).setToken(token);

const commands = [
    new SlashCommandBuilder()
        .setName('test')
        .setDescription('testing slash commands args.')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The gif category')
                .setRequired(true)
                .addChoice('Funny', 'gif_funny')
                .addChoice('Meme', 'gif_meme')
                .addChoice('Movie', 'gif_movie'))

]
    .map(command => command.toJSON());

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

*/




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




// online alert
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});




import server from './server.js';
server();

client.login(token);