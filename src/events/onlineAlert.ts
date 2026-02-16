import Hina from '../res/HinaClient.js';
import { getUsernameOrTag } from '../utils/user.js';

Hina.on('clientReady', () => {
    console.log(`Logged in as ${getUsernameOrTag(Hina.user!)}!`);
});

