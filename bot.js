import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import Discord, { Client, Intents } from 'discord.js';
import fs from 'fs';

import { prefix, token } from './res/config.js';

const Hina = new Client({ 
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
Hina.musicGuildProfile = new Map();



// register slash commands
const registerSlashCommands = async (slashCommandProfiles) => {

    const hinaId = '769125937731338290';
    const guildId = '744786416327721050';

    const rest = new REST({ version: '9' }).setToken(token);


    await rest.put(Routes.applicationGuildCommands(hinaId, guildId), { body: slashCommandProfiles });
    console.log('Successfully registered application commands.');
};



// loading commands
Hina.commands = new Discord.Collection();
const slashCommandProfiles = [];

const loadCommands = async () => {

    // folder: [emoji, fun, general...]
    const commandCategoryFolders = fs.readdirSync('./commands');
    for (const categoryFolder of commandCategoryFolders) {
        
        // file: [getemoji.js, reactemoji.js...]
        const commandFiles = fs.readdirSync(`./commands/${categoryFolder}`);
        for (const file of commandFiles) {

            const { default: command } = await import(`./commands/${categoryFolder}/${file}`);
            Hina.commands.set(command.name, command);

            if (command.aliases.length) {
                for (const alias of command.aliases) {
                    Hina.commands.set(alias, command);
                };
            };

            if (command.slashCommandProfile) {
                slashCommandProfiles.push(command.slashCommandProfile.toJSON());
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
    Hina.on(event.default.eventName, event.default.callback);
});
console.log('Events are successfully added!');




// command handler
Hina.on('messageCreate', async msg => {

    if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot) return;

    const noPrefixMsg = msg.content.slice(prefix.length).trim();
    const args = noPrefixMsg.split(/ +/);
    const command = args.shift().toLowerCase();

    let theCommand = Hina.commands.get(command)
    if (!theCommand) return await msg.channel.send('No such command found!');            
    
    try {
        await theCommand.execute(Hina, msg, args);
    }
    catch (err) {
        console.log(err);
    };
});




// slash command handler
Hina.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const command = Hina.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.slashExecute(Hina, interaction);
    }
    catch (err) {
        console.log(err);
    }
    
});





// online alert
Hina.on('ready', () => {
    console.log(`Logged in as ${Hina.user.tag}!`);
});




import server from './server.js';
server();

Hina.login(token);