import 'dotenv/config';
import { Client, Collection, GatewayIntentBits, IntentsBitField } from 'discord.js';

const Hina = new Client({
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
Hina.prefix = process.env.HINA_TEXT_COMMAND_PREFIX;

if (process.env.HINA_THEME_COLOR === undefined) {
    console.error('HINA_THEME_COLOR is not defined in .env file!');
    process.exit(1);
}
Hina.color = process.env.HINA_THEME_COLOR;

if (process.env.REPLY_OK_FULL_EMOJI_ID === undefined) {
    console.error('REPLY_OK_FULL_EMOJI_ID is not defined in .env file!');
    process.exit(1);
}
Hina.okEmoji = process.env.REPLY_OK_FULL_EMOJI_ID;

Hina.commands = new Collection();

export default Hina;

