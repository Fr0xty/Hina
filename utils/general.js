import { Permissions } from 'discord.js';
import fetch from 'node-fetch';




export const generateClientInvite = async (client) => {

    const invite = client.generateInvite({
        permissions: [Permissions.FLAGS.MODERATE_MEMBERS],
        scopes: ['bot', 'applications.commands'],
    });
    return invite;
};



export const hinaRequest = async (url) => {

    const data = await fetch(url);
    return await data.json();
};



export const guildOrClientIcon = async (client, guild) => {

    if (guild.iconURL()) return guild.iconURL({size: 4096, dynamic: true});
    return client.user.displayAvatarURL({size: 4096});
};