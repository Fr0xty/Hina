import fetch from 'node-fetch';
import { Client, Message, MessageEmbed } from 'discord.js';

import CommandArgument from '../../res/models/CommandArgument.js';
import { BaseCommand } from 'hina';
import { paginator } from '../../utils/paginator.js';

export default class jisho implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'jisho';
        this.description = 'searches for words from jisho.org.';
        this.commandUsage = '<word>';
        this.args = [new CommandArgument({ type: 'paragraph' }).setName('word').setDescription('word to search.')];
    }

    async execute(Hina: Client, msg: Message, args: string[]) {
        const [word] = args;

        const req = await fetch(`https://jisho.org/api/v1/search/words?keyword=${word}`);
        const result: any = await req.json();

        if (result.meta.status !== 200) return await msg.reply(`No result was found with the search term \`${word}\`.`);

        let pages: MessageEmbed[] = [];
        for (let i = 0; i < result.data.length; i++) {
            const wordResult = result.data[i];

            let tagList = [];
            // jlptLevel, isCommon, wakinaki?
            wordResult.jlpt.length
                ? tagList.push(wordResult.jlpt[0].replace('-', ' ').toUpperCase())
                : tagList.push('JLPT ??');
            wordResult.is_common ? tagList.push('common') : tagList.push('uncommon');
            if (wordResult.tags.length) tagList.push(wordResult.tags[0]);
            const tags = JSON.stringify(tagList).replaceAll('"', '').replaceAll(',', ', ').slice(1, -1);

            const sences = wordResult.senses;
            let definitions = '';
            let _ = 1;
            sences.forEach((sence: any) => {
                definitions += `${_++}. ${JSON.stringify(sence.english_definitions)
                    .replaceAll('"', '')
                    .replaceAll(',', ', ')
                    .slice(1, -1)}\n`;
            });

            let dbpediaRedirect;
            if (wordResult.attribution.dbpedia) {
                dbpediaRedirect = `[Meaning Explanation](${wordResult.attribution.dbpedia.replace('http', 'https')})`;
            } else {
                dbpediaRedirect = '';
            }

            let alternativeKanji = '**Alternative Writing**\n';
            const firstReading = wordResult.japanese.shift();
            if (wordResult.japanese.length) {
                wordResult.japanese.forEach((alt: any) => {
                    if (alt.word && alt.reading) alternativeKanji += `-${alt.word} (${alt.reading})\n`;
                    else if (alt.word) alternativeKanji += `-${alt.word}\n`;
                    else alternativeKanji += `-${alt.reading}\n`;
                });
            } else {
                alternativeKanji = '';
            }

            const embed = new MessageEmbed()
                .setColor(Hina.color)
                .setAuthor({
                    name: `Hina Jisho (Page ${i + 1} / ${result.data.length})`,
                    iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
                })
                .setTitle(`${firstReading.word} (${firstReading.reading})`)
                .setURL(`https://jisho.org/search/${wordResult.slug}`)
                .setDescription(
                    `
\`${tags}\`
${definitions}
${alternativeKanji}
${dbpediaRedirect}
-------------------------
                `
                )
                .setFooter({
                    text: `Requested by ${msg.author.tag}`,
                    iconURL: msg.author.displayAvatarURL(Hina.imageOption),
                })
                .setTimestamp();

            pages.push(embed);
        }
        await paginator(msg, pages, 300_000);
    }
}
