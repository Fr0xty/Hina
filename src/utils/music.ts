import ytSearch from 'yt-search';
import ytdl from 'ytdl-core';
import { createAudioResource } from '@discordjs/voice';

const ytLinkRegex =
    /(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/;

export const queryYT = async (query: string) => {
    let data;
    const video = ytLinkRegex.test(query) ? { url: query } : (await ytSearch(query)).videos.shift();
    if (!video) throw new Error('No result with keywords given.');

    // TODO check playability
    const stream = ytdl(video.url, { filter: 'audioonly' });
    const videoInfo = await ytdl.getInfo(video.url);
    const resource = createAudioResource(stream);
    return {
        resource: resource,
        videoInfo: videoInfo,
    };
};
