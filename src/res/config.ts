import { Player } from 'discord-player';
import { Client, Collection, Intents, ImageURLOptions } from 'discord.js';
import 'dotenv/config';

export const token = process.env.TOKEN;
export const prefix = 'test ';
export const hinaColor = '#E49CFF';

export const okEmoji = '902096184645124146';
export const hinaImageOption: ImageURLOptions = { dynamic: true, size: 4096 };

/************************************************
 * main Hina client
 ***********************************************/
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
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
/**
 * to store all commands
 */
Hina.commands = new Collection();

/**
 * player instance for music commands
 */
Hina.player = new Player(Hina);

Hina.player.on('trackStart', (queue, track) => {
    // @ts-ignore
    queue.metadata.channel.send('trackStart event called.');
});

export { Hina };
