import { Player } from 'discord-player';
import { Collection, ColorResolvable, TextChannel } from 'discord.js';

import Command from '../hina/classes/Command';
import GuildMusic from '../../src/res/models/GuildMusic';

declare module 'discord.js' {
    export interface Client {
        token: string;
        prefix: string;
        color: ColorResolvable;
        okEmoji: string;
        imageOption: Object;

        avatarHistoryChannel: any;
        owner: User;

        commands: Collection<String, Command>;
        player: Player;

        database: FirebaseFirestore;
    }

    export interface ClientPresenceObject {
        desktop?: 'online' | 'idle' | 'dnd';
        mobile?: 'online' | 'idle' | 'dnd';
        web?: 'online' | 'idle' | 'dnd';
    }
}
