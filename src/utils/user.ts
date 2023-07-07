import type { User } from 'discord.js';

export const getUserTag = (user: User) => {
    /**
     * user using new username system
     */
    if (user.discriminator === '0') return user.username;

    /**
     * user using legacy 4 digit discriminator system
     */
    return `${user.username}#${user.discriminator}`;
};
