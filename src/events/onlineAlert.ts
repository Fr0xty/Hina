import Hina from '../res/HinaClient.js';
import { getUsernameOrTag } from '../utils/user.js';

Hina.on('ready', () => {
    console.log(`Logged in as ${getUsernameOrTag(Hina.user!)}!`);
});
