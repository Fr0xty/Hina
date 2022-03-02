import { Collection } from 'discord.js';
import Command from '../hina/classes/Command';

declare module 'discord.js' {
    export interface Client {
        commands: Collection<String, Command>;
        musicGuildProfile: Collection<String, Object>;
    }

    export interface ClientPresenceObject {
        desktop?: 'online' | 'idle' | 'dnd';
        mobile?: 'online' | 'idle' | 'dnd';
        web?: 'online' | 'idle' | 'dnd';
    }
}
