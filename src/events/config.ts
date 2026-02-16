import Hina from '../res/HinaClient.js';

Hina.on('ready', async () => {
    /**
     * fetch required information from discord api
     */
    Hina.avatarHistoryChannel = await Hina.channels.fetch('953890455685333032');
    Hina.owner = await Hina.users.fetch('395587171601350676');
});
