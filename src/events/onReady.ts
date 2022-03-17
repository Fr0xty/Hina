import { Hina } from '../res/config.js';

Hina.on('ready', async () => {
    /**
     * special channel instances
     */
    Hina.avatarHistoryChannel = await Hina.channels.fetch('953890455685333032');
});
