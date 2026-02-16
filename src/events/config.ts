import 'dotenv/config';
import Hina from '../res/HinaClient.js';

Hina.on('ready', async () => {
    Hina.owner = await Hina.users.fetch(process.env.HINA_CLIENT_OWNER_ID!);
});

