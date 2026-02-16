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
Hina.token = process.env.HINA_CLIENT_TOKEN!;
Hina.prefix = process.env.HINA_TEXT_COMMAND_PREFIX!;
Hina.color = process.env.HINA_THEME_COLOR!;

Hina.okEmoji = process.env.REPLY_OK_FULL_EMOJI_ID!;
Hina.imageOption = { size: 4096 };

Hina.commands = new Collection();

export default Hina;

