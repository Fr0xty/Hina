import 'dotenv/config';
import { Collection } from 'discord.js';

import Hina from './1_initializeHina.js';

/**
 * properties
 */
Hina.token = process.env.HINA_CLIENT_TOKEN!;
Hina.prefix = process.env.HINA_TEXT_COMMAND_PREFIX!;
Hina.color = 14982399;

Hina.okEmoji = '902096184645124146';
Hina.imageOption = { size: 4096 };

/**
 * to store commands
 */
Hina.commands = new Collection();

export default Hina;
