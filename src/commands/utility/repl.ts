import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import piston from 'piston-client';
import { extractCodeBlock } from '../../utils/general.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('repl')
                .setDescription('run code directly in discord.')
                .addStringOption((option) =>
                    option.setName('message_id').setDescription('message id of code block.').setRequired(true)
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            message_id: interaction.options.get('message_id')!.value as string,
        };

        try {
            const msgContent = (await interaction.channel?.messages.fetch(args.message_id))!.content;

            const codeBlockData = await extractCodeBlock(msgContent);
            const { code } = codeBlockData;
            let { language } = codeBlockData;

            /**
             * if no code / code is not provided properly
             */
            if (code === null || code === undefined) {
                return await interaction.reply({
                    content: 'Please write the code using a Discord code block.',
                    ephemeral: true,
                });
            }

            /**
             * if language is not provided
             */
            if (language === null || language === undefined) {
                return await interaction.reply({
                    content:
                        'Please use code block syntax highlighting to provide info about the language you are using.',
                    ephemeral: true,
                });
            }

            /**
             * require more time to return a response
             */
            await interaction.deferReply();

            /**
             * make a request
             */
            const pistonClient = piston({ server: 'https://emkc.org' });
            const runtimes = await pistonClient.runtimes();
            runtimes.forEach((runtime: any) => {
                if (runtime.aliases.includes(language) || runtime.language === language) language = runtime.language;
            });
            const result = await pistonClient.execute(language, code);

            /**
             * if request is invalid
             */
            if (!result.run) return await interaction.followUp(`Sorry, \`${language}\` language is not supported.`);

            /**
             * format result
             */
            let consoleMsg;
            if (result.run?.stdout === '' && result.run?.code === 0) {
                consoleMsg = 'Code ran with no exceptions...';
            } else if (result.run.code !== 0) {
                consoleMsg = result.run.stderr;
            } else {
                consoleMsg = result.run.stdout;
            }

            const embed = new EmbedBuilder()
                .setColor(Hina.color)
                .setAuthor({ name: "Hina's Code Runner", iconURL: Hina.user!.displayAvatarURL(Hina.imageOption) })
                .setDescription(
                    `
\`\`\`\n${consoleMsg}\`\`\`
exit code: \`${result.run.code}\`
**Info:**
language: \`${result.language}\`
version: \`${result.version}\`
            `
                )
                .setTimestamp();

            await interaction.followUp({ embeds: [embed] });
        } catch (err: any) {
            /**
             * feching message failed
             */
            console.log(err);

            return await interaction.reply({
                content: 'Cannot find message with the given message id, the message has to be in the same channel.',
                ephemeral: true,
            });
        }
    }
}
