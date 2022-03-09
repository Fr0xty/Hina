import { Player } from 'discord-player';
import { Collection } from 'discord.js';
import GuildMusic from '../../src/res/models/GuildMusic';
import Command from '../hina/classes/Command';

declare module 'discord.js' {
    export interface Client {
        commands: Collection<String, Command>;
        player: Player;
    }

    export interface ClientPresenceObject {
        desktop?: 'online' | 'idle' | 'dnd';
        mobile?: 'online' | 'idle' | 'dnd';
        web?: 'online' | 'idle' | 'dnd';
    }
}
