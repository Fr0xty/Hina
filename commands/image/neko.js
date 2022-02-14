import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import { paginator } from '../../utils/paginator.js';
import { prefix, hinaColor, hinaImageOption } from '../../res/config.js';


export default {

    name: 'neko',
    aliases: ['shinobu', 'megumin', 'awoo', 'nsfwneko', 'trap', 'blowjob'],
    description: 'get nice pictures.',





    async execute(Hina, msg, args) {
        
        // amount
        let num;
        if (!args.length) num = 1;
        else if (args[0] > 0 && args[0] < 31) { num = args[0] }
        else return await msg.reply('Invalid number! Please provide 0 < __num__ < 31.');

        // tag
        const tag = msg.content.slice(prefix.length).split(' ').shift().toLowerCase();
        let endpoint;
        switch (tag) {
            case ('neko'):
                endpoint = 'sfw/neko';
                break;
            case ('shinobu'):
                endpoint = 'sfw/shinobu';
                break;
            case ('megumin'):
                endpoint = 'sfw/megumin';
                break;
            case ('awoo'):
                endpoint = 'sfw/awoo';
                break;
            case ('nsfwneko'):
                endpoint = 'nsfw/neko';
                break;
            case ('trap'):
                endpoint = 'nsfw/trap';
                break;
            case ('blowjob'):
                endpoint = 'nsfw/blowjob';
                break;
        };
        let result = await fetch(`https://api.waifu.pics/many/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify({ type: endpoint.split('/')[0]  }),
            headers: { 'Content-Type': 'application/json' },
            }
        );
        result = await result.json();

        const images = result.files;

        let pages = [];
        let _ = 1;
        for (let i = 0; i < num; i++) {

            const embed = new MessageEmbed()
                .setAuthor({name: `${Hina.user.username} Page ${_++} / ${num}`})
                .setColor(hinaColor)
                .setTitle(tag)
                .setImage(images[i])
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
                .setTimestamp();

            pages.push(embed);
        };

        await paginator(msg, pages, 120_000);
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};