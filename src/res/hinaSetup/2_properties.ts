import 'dotenv/config';
import { Collection } from 'discord.js';

import Hina from './1_initializeHina.js';

/**
 * properties
 */
Hina.token = process.env.TOKEN!;
Hina.prefix = 'hina ';
Hina.color = '#E49CFF';

Hina.okEmoji = '902096184645124146';
Hina.imageOption = { dynamic: true, size: 4096 };

/**
 * to store commands
 */
Hina.commands = new Collection();

export default Hina;
