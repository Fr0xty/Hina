import { Client, Guild, Permissions } from 'discord.js';

export const generateHinaInvite = async (Hina: Client) => {
    const invite = Hina.generateInvite({
        permissions: [Permissions.FLAGS.MODERATE_MEMBERS],
        scopes: ['bot', 'applications.commands'],
    });
    return invite;
};

export const guildOrHinaIcon = async (Hina: Client, guild: Guild) => {
    if (guild.iconURL()) return guild.iconURL(Hina.imageOption);
    return Hina.user!.displayAvatarURL(Hina.imageOption);
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
