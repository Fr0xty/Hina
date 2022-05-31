import Hina from '../res/HinaClient.js';

Hina.on('ready', () => {
    console.log(`Logged in as ${Hina.user!.tag}!`);
});
