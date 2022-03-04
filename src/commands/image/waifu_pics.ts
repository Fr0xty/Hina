import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import { BaseCommand } from 'hina';
import { paginator } from '../../utils/paginator.js';
import { prefix, hinaColor, hinaImageOption } from '../../res/config.js';
import CommandArgument from '../../res/models/CommandArgument.js';

export default class waifu_pics implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    aliases: String[];
    args: CommandArgument[];

    constructor() {
        this.name = 'neko';
        this.description = 'get nice pictures.';
        this.commandUsage = '[amount]';
        this.aliases = ['shinobu', 'megumin', 'awoo', 'nsfwneko', 'trap', 'blowjob'];
        this.args = [
            new CommandArgument({ optional: true })
                .setName('amount')
                .setDescription('amount of pictures, has to be > 0 and < 31')
                .setMin(1)
                .setMax(30),
        ];
    }

    async execute(msg: Message, args: string[]) {}
}
