import Hina from '../res/HinaClient.js';

Hina.on('error', async (err) => {
    console.log(err.message);
});
