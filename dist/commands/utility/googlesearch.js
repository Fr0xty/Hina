import { MessageEmbed } from 'discord.js';
import * as Cheerio from 'cheerio';
import CommandArgument from '../../res/models/CommandArgument.js';
import { Hina } from '../../res/config.js';
export default class googlesearch {
    name;
    description;
    commandUsage;
    aliases;
    args;
    constructor() {
        this.name = 'googlesearch';
        this.description = 'quickly google search through Discord.';
        this.commandUsage = '<search_sentence>';
        this.aliases = ['gs'];
        this.args = [
            new CommandArgument({ type: 'paragraph' })
                .setName('search_sentence')
                .setDescription('sentence to input into searchbar.'),
        ];
    }
    async execute(msg, args) {
        const [search_sentence] = args;
        const googleSearchURL = `https://www.google.com/search?q=${search_sentence}`.trim().replace(' ', '+');
        const req = await fetch(googleSearchURL, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = Cheerio.load(await req.text());
        let embedDescription = '';
        $('div.ZINbbc.luh4tb.xpd.O9g5cc.uUPGi').each((i, element) => {
            if (i > 5)
                return;
            const topDiv = $(element).find('div.egMi0.kCrYT');
            const bottomDiv = $(element).find('div.kCrYT');
            const title = $(topDiv).find('h3.zBAuLc.l97dzf').text();
            const titleLink = $(topDiv).find('a').attr('href').replace('/url?q=', '');
            const description = $(bottomDiv).find('div.BNeawe.s3v9rd.AP7Wnd').text();
            embedDescription += `
[${title}](${titleLink})
${description}

            `;
        });
        const embed = new MessageEmbed()
            .setColor(Hina.color)
            .setTitle(`Search result for: ${search_sentence}`)
            .setURL(googleSearchURL)
            .setDescription(embedDescription);
        await msg.reply({ embeds: [embed] });
    }
}
