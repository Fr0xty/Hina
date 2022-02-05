import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Intents } from 'discord.js';
import Discord from 'discord.js';
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







// loading commands
client.commands = new Discord.Collection();

const commandsFolder = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandsFolder.forEach(async file => {
    const category = await import(`./commands/${file}`);

    category.commands.forEach(comm => {
        client.commands.set(comm.name, comm);
    });
});
console.log('Commands are successfully added!');



// loading event handlers
const eventsFolder = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

eventsFolder.forEach(async file => {
    const event = await import(`./events/${file}`);
    client.on(event.default.eventType, event.default.callback);
});
console.log('Events are successfully added!');



// register slash commands
const CLIENT_ID = '882840863154270289';
const GUILD_ID = '859029044942471208';

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: client.commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
});








// command handler
client.on('messageCreate', async (msg) => {
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
        }
        
    }
});



// slash command handler
/*
client.on('interactionCreate', async (interaction) => {

    if (!interaction.isCommand()) return;

    try {
        result = Discord.commands.get(interaction.commandName).executeSlash(interaction);
    }
    catch (err) {
        console.log(err);
    }

});
*/




client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});




import server from './server.js';
server();

client.login(token);