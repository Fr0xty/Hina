import { Message, MessageEmbed } from 'discord.js';
import Translate from 'translate';
import DetectLanguage from 'detectlanguage';
import 'dotenv/config';

import { BaseCommand } from 'hina';
import { Hina } from '../../res/config.js';
import CommandArgument from '../../res/models/CommandArgument.js';

Translate.engine = 'google';
const DetectClient = new DetectLanguage(process.env.DETECTLANGUAGE_API_KEY!);

export default class translate implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    aliases: String[];
    args: CommandArgument[];

    constructor() {
        this.name = 'translate';
        this.description = 'translate to and from any language of your choice!';
        this.commandUsage = '[to_language] [from_language]';
        this.aliases = ['trans'];
        this.args = [
            new CommandArgument({ optional: true })
                .setName('to_language')
                .setDescription(
                    'Translate to what language? Leaving blank will default to english. Only accept `ISO 639-1` & `ISO 639-2` language code.'
                ),

            new CommandArgument({ optional: true })
                .setName('from_language')
                .setDescription(
                    'Translate from what language? Leaving blank will auto detect language. Only accept `ISO 639-1` & `ISO 639-2` language code.'
                ),
        ];
    }

    async execute(msg: Message, args: string[]) {
        let [to_language, from_language] = args;

        if (!msg.reference) return await msg.reply('Please reply to the message you want to translate.');
        const { content: originalText } = await msg.fetchReference();

        Translate.to = to_language ? to_language : 'en';

        // get from_language
        let detectResult;
        if (from_language) Translate.from = from_language;
        if (!from_language) {
            detectResult = await DetectClient.detect(originalText);
            Translate.from = detectResult[0].language;
        }

        // translate the message
        let translatedText;
        try {
            translatedText = await Translate(originalText);
        } catch (err: any) {
            await msg.reply(err);
        }

        const embed = new MessageEmbed()
            .setColor(Hina.color)
            .setAuthor({ name: 'Hina Translate', iconURL: Hina.user!.displayAvatarURL() })
            .setDescription(
                `
from: \`${Translate.from}\`
to: \`${Translate.to}\`

> ${translatedText}

${
    detectResult
        ? `
\`from\` is detected at confidence of: \`${detectResult[0].confidence}%\`
if my prediction is wrong, you can provide \`[from_language]\`.`
        : ''
}
        `
            )
            .setFooter({ text: `Requested by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL() })
            .setTimestamp();

        await msg.reply({ embeds: [embed] });
    }
}
