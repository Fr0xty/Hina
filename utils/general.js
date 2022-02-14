import { Permissions } from 'discord.js';

import { hinaImageOption } from '../res/config.js';




export const generateHinaInvite = async (Hina) => {

    const invite = Hina.generateInvite({
        permissions: [Permissions.FLAGS.MODERATE_MEMBERS],
        scopes: ['bot', 'applications.commands'],
    });
    return invite;
};



export const guildOrHinaIcon = async (Hina, guild) => {

    if (guild.iconURL()) return guild.iconURL(hinaImageOption);
    return Hina.user.displayAvatarURL(hinaImageOption);
};