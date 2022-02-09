import { Permissions } from 'discord.js';

import { hinaImageOption } from '../res/config.js';




export const generateClientInvite = async (client) => {

    const invite = client.generateInvite({
        permissions: [Permissions.FLAGS.MODERATE_MEMBERS],
        scopes: ['bot', 'applications.commands'],
    });
    return invite;
};



export const guildOrClientIcon = async (client, guild) => {

    if (guild.iconURL()) return guild.iconURL(hinaImageOption);
    return client.user.displayAvatarURL(hinaImageOption);
};