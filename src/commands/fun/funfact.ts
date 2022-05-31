import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';

import { BaseCommand } from 'hina';
import Hina from '../../res/HinaClient.js';
import { Message } from 'discord.js';

export default class funfact implements BaseCommand {
    name: String;
    description: String;

    constructor() {
        this.name = 'funfact';
        this.description = 'get a fun fact.';
    }

    async execute(msg: Message, args: string[]) {
        const req = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        if (req.status !== 200)
            return await msg.reply('Sorry, something went wrong went making the request. Please try again.');
        const fact: any = await req.json();

        const embed = new MessageEmbed()
            .setColor(Hina.color)
            .setAuthor({ name: 'Fun fact with Hina!', iconURL: Hina.user!.displayAvatarURL(Hina.imageOption) })
            .setFooter({
                text: `Requested by: ${msg.author.tag}`,
                iconURL: msg.author.displayAvatarURL(Hina.imageOption),
            })
            .setTimestamp().setDescription(`
${fact.text.replace('`', '\\`')}

source: [here](${fact.source_url})
            `);
        await msg.reply({ embeds: [embed] });
    }
}
