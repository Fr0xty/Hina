import { Player } from 'discord-player';
import { Collection, ColorResolvable } from 'discord.js';
import GuildMusic from '../../src/res/models/GuildMusic';
import Command from '../hina/classes/Command';

declare module 'discord.js' {
    export interface Client {
        token: string;
        prefix: string;
        color: ColorResolvable;
        okEmoji: string;
        imageOption: Object;

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
