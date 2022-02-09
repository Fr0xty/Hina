import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import { hinaColor, hinaImageOption } from '../res/config.js';


export const commands = [

    {
        name: 'funfact',
        aliases: [],
        desciption: 'get a fun fact!',
        async execute(client, msg, args) {

            try {
                let fact = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
                fact = await fact.json();
                
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
            }
            catch (err) {
                await msg.reply('Sorry, something went wrong went making the request. Please try again.');
                console.log(err);
            };
        }
    },



    {
        name: 'joke',
        aliases: [],
        desciption: 'I will tell you a joke.',
        async execute(client, msg, args) {

            try {
                let joke = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,racist,sexist');
                joke = await joke.json();
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
            }
            catch (err) {
                await msg.reply('Sorry, something went wrong went making the request. Please try again.');
                console.log(err);
            };
        }
    },



    {
        name: 'act',
        aliases: [],
        description: 'I will impersonate the user to say things.',
        async execute(client, msg, args) {

            if (args.length < 2) {
                await msg.reply('Please provide a user and a message');
                return;
            }
            let id = args.shift();
            id = id.match(/[0-9]+/);
            const userMsg = args.join(' ');

            try {
                const member = msg.mentions.members.first();
                
                const webhook = await msg.channel.createWebhook(member.displayName, {
                    avatar: member.displayAvatarURL(hinaImageOption)
                });

                await webhook.send(userMsg);
                await webhook.delete();
                await msg.delete();
                return;
            }
            catch (err) {
                console.log(err);
                await msg.reply('User is invalid or is not in the server!');
            };
        }
    },
];