const { Permissions } = require('discord.js');
const https = require('https');

module.exports = {

    generateClientInvite: (client) => {

        return client.generateInvite({
            permissions: [Permissions.FLAGS.MODERATE_MEMBERS],
            scopes: ['bot', 'applications.commands'],
        });
        
    },



    hinaAsyncRequest: (url) => {

        return new Promise((resolve, reject) => {
            https
                .get(url, resp => {

                    let data = '';

                    resp.on('data', chunk => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        resolve(JSON.parse(data));
                    });
                })
                .on('error', err => {
                    reject(err.message);
                });
        });
    }
}
