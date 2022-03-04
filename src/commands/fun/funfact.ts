import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import { Hina, hinaColor, hinaImageOption } from '../../res/config.js';
import { Message } from 'discord.js';

export default class funfact implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;

    constructor() {
        this.name = 'funfact';
        this.description = 'get a fun fact.';
        this.commandUsage = 'funfact';
    }

    async execute(msg: Message, args: string[]) {
        const req = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        if (req.status !== 200)
            return await msg.reply('Sorry, something went wrong went making the request. Please try again.');
        const fact: any = await req.json();

        const embed = new MessageEmbed()
            .setColor(hinaColor)
            .setAuthor({ name: 'Fun fact with Hina!', iconURL: Hina.user!.displayAvatarURL(hinaImageOption) })
            .setFooter({
                text: `Requested by: ${msg.author.tag}`,
                iconURL: msg.author.displayAvatarURL(hinaImageOption),
            })
            .setTimestamp().setDescription(`
${fact.text.replace('`', '\\`')}

source: [here](${fact.source_url})
            `);
        await msg.reply({ embeds: [embed] });
    }
}
