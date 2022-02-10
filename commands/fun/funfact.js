import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import { hinaColor, hinaImageOption } from '../../res/config.js';


export default {

    name: 'funfact',
    aliases: [],
    description: 'get a fun fact!',





    async execute(client, msg, args) {
    
        let req = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        if (fact.status !== 200) return await msg.reply('Sorry, something went wrong went making the request. Please try again.');
        const fact = await req.json();
        
        const embed = new MessageEmbed()
            .setColor(hinaColor)
            .setAuthor({name: 'Fun fact with Hina!', iconURL: client.user.displayAvatarURL(hinaImageOption)})
            .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
            .setTimestamp()
            .setDescription(`
${fact.text.replace('`', '\\`')}

source: [here](${fact.source_url})
            `)
        await msg.reply({ embeds: [embed] });
    },





    async slashExecute(client, interaction) {
        return;
    },
};