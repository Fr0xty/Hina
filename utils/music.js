const ytSearch = require('yt-search');

module.exports = {

    searchYT: (query) => {
        return new Promise(async (resolve, reject) => {

            const videoResult = await ytSearch(query);
            if (videoResult.videos.length > 1) resolve(videoResult.videos[0]);
            resolve(null);
            
        });
    },
};