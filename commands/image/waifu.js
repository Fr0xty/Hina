import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import { paginator } from '../../utils/paginator.js';
import { prefix, hinaColor, hinaImageOption } from '../../res/config.js';


export default {

    name: 'waifu',
    aliases: ['maid', 'ass', 'ecchi', 'ero', 'hentai', 'nsfwmaid', 'milf', 'oppai', 'oral', 'paizuri', 'selfies', 'uniform', 'random'],
    description: 'get nice pictures.',





    async execute(client, msg, args) {
        
        // amount
        let num;
        if (!args.length) num = 1;
        else if (args[0] > 0 && args[0] < 31) { num = args[0] }
        else return await msg.reply('Invalid number! Please provide 0 < __num__ < 31.');

        // tag
        const tag = msg.content.slice(prefix.length).split(' ').shift().toLowerCase();
        let endpoint;
        switch (tag) {
            case ('waifu'):
                endpoint = 'sfw/waifu';
                break;
            case ('maid'):
                endpoint = 'sfw/maid';
                break;
            case ('ass'):
                endpoint = 'nsfw/ass';
                break;
            case ('ecchi'):
                endpoint = 'nsfw/ecchi';
                break;
            case ('ero'):
                endpoint = 'nsfw/ero';
                break;
            case ('hentai'):
                endpoint = 'nsfw/hentai';
                break;
            case ('nsfwmaid'):
                endpoint = 'nsfw/maid';
                break;
            case ('milf'):
                endpoint = 'nsfw/milf';
                break;
            case ('oppai'):
                endpoint = 'nsfw/oppai';
                break;
            case ('oral'):
                endpoint = 'nsfw/oral';
                break;
            case ('paizuri'):
                endpoint = 'nsfw/paizuri';
                break;
            case ('selfies'):
                endpoint = 'nsfw/selfies';
                break;
            case ('uniform'):
                endpoint = 'nsfw/uniform';
                break;
            case ('random'):
                endpoint = 'random';
                break;
        };
        let result = await fetch(`https://api.waifu.im/${endpoint}?many=true`);
        result = await result.json();

        const images = result.images;

        let pages = [];
        let _ = 1;
        for (let i = 0; i < num; i++) {

            const embed = new MessageEmbed()
                .setAuthor({name: `${client.user.username} Page ${_++} / ${num}`})
                .setColor(images[i].dominant_color)
                .setTitle(tag)
                .setDescription(`[source](${images[i].source})`)
                .setImage(images[i].url)
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
                .setTimestamp();

            pages.push(embed);
        };

        await paginator(msg, pages, 120_000);
    },





    async slashExecute(client, interaction) {
        return;
    },
};