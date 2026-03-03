import 'dotenv/config';
import { Client, Collection, GatewayIntentBits } from 'discord.js';

const hina = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildExpressions,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

/**
 * properties
 */
if (process.env.HINA_TEXT_COMMAND_PREFIX === undefined) {
    console.error('HINA_TEXT_COMMAND_PREFIX is not defined in .env file!');
    process.exit(1);
}
hina.prefix = process.env.HINA_TEXT_COMMAND_PREFIX;

if (process.env.HINA_THEME_COLOR === undefined) {
    console.error('HINA_THEME_COLOR is not defined in .env file!');
    process.exit(1);
}
hina.color = process.env.HINA_THEME_COLOR;

if (process.env.HINA_REPLY_OK_FULL_EMOJI_ID === undefined) {
    console.error('HINA_REPLY_OK_FULL_EMOJI_ID is not defined in .env file!');
    process.exit(1);
}
hina.okEmoji = process.env.HINA_REPLY_OK_FULL_EMOJI_ID;

hina.commands = new Collection();

export default hina;

