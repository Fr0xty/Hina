import type { ClientUser, User } from 'discord.js';

export const getUsernameOrTag = (user: User | ClientUser) => {
    /**
     * user using new username system
     */
    if (user.discriminator === '0') return user.username;

    /**
     * user using legacy 4 digit discriminator system
     */
    return `${user.username}#${user.discriminator}`;
};
