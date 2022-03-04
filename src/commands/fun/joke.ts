import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';

import { BaseCommand } from 'hina';
import { Hina, hinaColor, hinaImageOption } from '../../res/config.js';
import { Message } from 'discord.js';

export default class funfact implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;

    constructor() {
        this.name = 'joke';
        this.description = 'Allow me to tell you a joke.';
        this.commandUsage = 'joke';
    }

    async execute(msg: Message, args: string[]) {
        const req = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,racist,sexist');
        if (req.status !== 200)
            return await msg.reply('Sorry, something went wrong went making the request. Please try again.');
        const joke: any = await req.json();

        const content =
            joke.type === 'single'
                ? joke.joke
                : `${joke.setup.replace('`', '\\`')}\n||${joke.delivery.replace('`', '\\`')}||`;

        const embed = new MessageEmbed()
            .setColor(hinaColor)
            .setAuthor({ name: `Joke (${joke.category})`, iconURL: Hina.user!.displayAvatarURL(hinaImageOption) })
            .setFooter({
                text: `Requested by: ${msg.author.tag}`,
                iconURL: msg.author.displayAvatarURL(hinaImageOption),
            })
            .setTimestamp()
            .setDescription(`${content}\n\n[source](https://v2.jokeapi.dev/)`);
        await msg.reply({ embeds: [embed] });
    }
}
