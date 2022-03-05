import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import { BaseCommand } from 'hina';
import { paginator } from '../../utils/paginator.js';
import { Hina, prefix, hinaColor, hinaImageOption } from '../../res/config.js';
import CommandArgument from '../../res/models/CommandArgument.js';

export default class waifuPics implements BaseCommand {
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

    async execute(msg: Message, args: string[]) {
        const [givenAmount] = args;
        const amount = givenAmount ? Number(givenAmount) : 1;

        const tag = msg.content.slice(prefix.length).split(' ').shift()!.toLowerCase();
        let endpoint;
        switch (tag) {
            case 'neko':
                endpoint = 'sfw/neko';
                break;
            case 'shinobu':
                endpoint = 'sfw/shinobu';
                break;
            case 'megumin':
                endpoint = 'sfw/megumin';
                break;
            case 'awoo':
                endpoint = 'sfw/awoo';
                break;
            case 'nsfwneko':
                endpoint = 'nsfw/neko';
                break;
            case 'trap':
                endpoint = 'nsfw/trap';
                break;
            case 'blowjob':
                endpoint = 'nsfw/blowjob';
                break;
        }
        if (!endpoint) return; // get rid of stupid typescript error
        const req = await fetch(`https://api.waifu.pics/many/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify({ type: endpoint.split('/')[0] }),
            headers: { 'Content-Type': 'application/json' },
        });
        const result: any = await req.json();
        const images = result.files;

        let pages = [];
        let _ = 1;
        for (let i = 0; i < amount; i++) {
            const embed = new MessageEmbed()
                .setAuthor({ name: `${Hina.user!.username} Page ${_++} / ${amount}` })
                .setColor(hinaColor)
                .setTitle(tag)
                .setImage(images[i])
                .setFooter({
                    text: `Requested by: ${msg.author.tag}`,
                    iconURL: msg.author.displayAvatarURL(hinaImageOption),
                })
                .setTimestamp();

            pages.push(embed);
        }
        await paginator(msg, pages, 120_000);
    }
}
