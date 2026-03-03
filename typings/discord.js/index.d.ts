import { Player } from 'discord-player';
import { Collection, RGBTuple, TextChannel } from 'discord.js';

import BaseCommand from '../../src/lib/BaseCommand';
import { Command } from 'hina';

declare module 'discord.js' {
    export interface Client {
        prefix: string;
        color: string;
        okEmoji: string;

        owner: User;

        commands: Collection<String, BaseCommand>;
    }

    export interface ClientPresenceObject {
        desktop?: 'online' | 'idle' | 'dnd';
        mobile?: 'online' | 'idle' | 'dnd';
        web?: 'online' | 'idle' | 'dnd';
    }
}

