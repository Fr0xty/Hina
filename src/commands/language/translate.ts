import 'dotenv/config';
import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import DetectLanguage from 'detectlanguage';
import Translate from 'translate';
import { getUsernameOrTag } from '../../utils/user.js';

Translate.engine = 'google';
const DetectClient = new DetectLanguage(process.env.DETECTLANGUAGE_API_KEY!);

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('translate')
                .setDescription('translate a message to and from any language.')
                .addStringOption((option) =>
                    option
                        .setName('message_id')
                        .setDescription('message id of the message you want to translate.')
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option.setName('to_language').setDescription('language to translate to. Defaults to English.')
                )
                .addStringOption((option) =>
                    option
                        .setName('from_language')
                        .setDescription('language of the original message. Defaults to detect language.')
                )
                .setDMPermission(false)
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            message_id: interaction.options.get('message_id')!.value as string,
            to_language: interaction.options.get('to_language')?.value as string | undefined,
            from_language: interaction.options.get('from_language')?.value as string | undefined,
        };

        let targetMessage;
        try {
            targetMessage = await interaction.channel!.messages.fetch(args.message_id);
        } catch {
            return await interaction.reply({ content: 'Invalid message id.', ephemeral: true });
        }

        Translate.to = args.to_language ?? 'en';
        Translate.from = args.from_language;

        let detectResult, translatedText;

        /**
         * from_language not provided: detect language and use as from_language
         */
        if (!args.from_language) {
            detectResult = await DetectClient.detect(targetMessage.content);
            Translate.from = detectResult[0].language;
        }

        /**
         * translate
         */
        try {
            translatedText = await Translate(targetMessage.content);
        } catch {
            return await interaction.reply('Invalid language code.');
        }

        const embed = new EmbedBuilder()
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
            .setFooter({
                text: `Requested by ${getUsernameOrTag(interaction.user)}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
