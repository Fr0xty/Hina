import { Permissions } from 'discord.js';
import https from 'https';




export const generateClientInvite = async (client) => {

    const invite = client.generateInvite({
        permissions: [Permissions.FLAGS.MODERATE_MEMBERS],
        scopes: ['bot', 'applications.commands'],
    });
    return invite;
};



export const hinaAsyncRequest = async (url) => {

    https
        .get(url, resp => {

            let data = '';

            resp.on('data', chunk => {
                data += chunk;
            });

            resp.on('end', () => {
                return JSON.parse(data);
            });
        })
        .on('error', err => {
            throw err.message;
        });
};



export const guildOrClientIcon = async (client, guild) => {

    if (guild.iconURL()) return guild.iconURL({size: 4096, dynamic: true});
    return client.user.displayAvatarURL({size: 4096});
};