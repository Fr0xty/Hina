import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import { hinaColor, hinaImageOption } from '../../res/config.js';


export default {

    name: 'joke',
    aliases: [],
    description: 'I will tell you a joke.',





    async execute(client, msg, args) {

        let req = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,racist,sexist');
        if (req.status !== 200) return await msg.reply('Sorry, something went wrong went making the request. Please try again.');
        const joke = await req.json();

        let content;
        if (joke.type === 'single') { content = joke.joke }
        else { content = `${joke.setup.replace('`', '\\`')}\n||${joke.delivery.replace('`', '\\`')}||` };

        const embed = new MessageEmbed()
            .setColor(hinaColor)
            .setAuthor({name: `Joke (${joke.category})`, iconURL: client.user.displayAvatarURL(hinaImageOption)})
            .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
            .setTimestamp()
            .setDescription(`${content}\n\n[source](https://v2.jokeapi.dev/)`)
        await msg.reply({ embeds: [embed] });
    },





    async slashExecute(client, interaction) {
        return;
    },
};