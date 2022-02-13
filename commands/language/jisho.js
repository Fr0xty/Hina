import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import { hinaColor, hinaImageOption } from '../../res/config.js';
import { paginator } from '../../utils/paginator.js';


export default {

    name: 'jisho',
    aliases: [],
    description: 'searches for words from jisho.org.',





    async execute(client, msg, args) {

        if (!args.length) return await msg.reply('Please provide a search term!');
        
        const query = args.join(' ');
        let result = await fetch(`https://jisho.org/api/v1/search/words?keyword=${query}`);
        result = await result.json();

        if (result.meta.status != 200) return await msg.reply(`No result was found with the search term \`${word}\`.`);

        let pages = [];
        result.data.forEach(word => {
            
            let tags = [];
            // jlptLevel, isCommon, wakinaki?
            word.jlpt.length ? tags.push(word.jlpt[0].replace('-', ' ').toUpperCase()) : tags.push('JLPT ??');
            word.is_common ? tags.push('common') : tags.push('uncommon');
            if (word.tags.length) tags.push(word.tags[0]);
            tags = JSON.stringify(tags).replaceAll('"', '').replaceAll(',', ', ').slice(1, -1);

            const SENCES = word.senses;
            let definitions = '';
            let _ = 1;
            SENCES.forEach(sence => {
                definitions += `${_++}. ${JSON.stringify(sence.english_definitions).replaceAll('"', '').replaceAll(',', ', ').slice(1, -1)}\n`;
            });

            let dbpediaRedirect;
            if (word.attribution.dbpedia) {
                dbpediaRedirect = `[Meaning Explanation](${word.attribution.dbpedia.replace('http', 'https')})`
            } else {
                dbpediaRedirect = '';
            }

            let alternativeKanji = '**Alternative Writing**\n';
            const firstReading = word.japanese.shift();
            if (word.japanese.length) {
                word.japanese.forEach(alt => {
                    if (alt.word && alt.reading) alternativeKanji += `-${alt.word} (${alt.reading})\n`
                    else if (alt.word) alternativeKanji += `-${alt.word}\n`
                    else alternativeKanji += `-${alt.reading}\n`
                });
            } else { alternativeKanji = ''};

            const embed = new MessageEmbed()
                .setColor(hinaColor)
                .setAuthor({name: `Hina Jisho (Page ${result.data.indexOf(word) + 1} / ${result.data.length})`, iconURL: client.user.displayAvatarURL(hinaImageOption)})
                .setTitle(`${firstReading.word} (${firstReading.reading})`)
                .setURL(`https://jisho.org/search/${word.slug}`)
                .setDescription(`
\`${tags}\`
${definitions}
${alternativeKanji}
${dbpediaRedirect}
-------------------------
                `)
                .setFooter({text: `Requested by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
                .setTimestamp();
            
            pages.push(embed);
        });
        await paginator(msg, pages, 300_000);
    },





    async slashExecute(client, interaction) {
        return;
    },
};