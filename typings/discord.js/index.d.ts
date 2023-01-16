import { Player } from 'discord-player';
import { Collection, RGBTuple, TextChannel } from 'discord.js';

import GuildMusic from '../../src/res/models/GuildMusic';
import BaseCommand from '../../src/res/BaseCommand';
import { Command } from 'hina';

declare module 'discord.js' {
    export interface Client {
        token: string;
        prefix: string;
        color: number | RGBTuple;
        okEmoji: string;
        imageOption: Object;

        avatarHistoryChannel: any;
        owner: User;

        commands: Collection<String, BaseCommand>;
        player: Player;

        database: FirebaseFirestore;
    }

    export interface ClientPresenceObject {
        desktop?: 'online' | 'idle' | 'dnd';
        mobile?: 'online' | 'idle' | 'dnd';
        web?: 'online' | 'idle' | 'dnd';
    }
}
