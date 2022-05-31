import { Message, MessageEmbed } from 'discord.js';
import piston from 'piston-client';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import Hina from '../../res/HinaClient.js';

export default class repl implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'repl';
        this.description = 'run code snippets in a sandbox.';
        this.commandUsage = '<discord codeblock with syntax highlighting>';
        this.args = [
            new CommandArgument({ type: 'paragraph' })
                .setName('script')
                .setDescription('code to run, do `hina help coderunner` for more info.'),
        ];
    }

    async execute(msg: Message, args: string[]) {
        const [script] = args;

        let code = script.replaceAll('```', '').trim();
        const lang = code.match(/.+/)![0];
        code = code.replace(/.+/, '');

        const pistonClient = piston({ server: 'https://emkc.org' });
        const runtimes = await pistonClient.runtimes();
        let language;
        runtimes.forEach((runtime: any) => {
            if (runtime.aliases.includes(lang) || runtime.language === lang) language = runtime.language;
        });
        const result = await pistonClient.execute(language, code);

        let consoleMsg;
        if (result.run.stdout === '' && result.run.code === 0) {
            consoleMsg = 'Code ran with no exceptions...';
        } else if (result.run.code != 0) {
            consoleMsg = result.run.stderr;
        } else {
            consoleMsg = result.run.stdout;
        }

        const embed = new MessageEmbed()
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
            .setFooter({
                text: `Requested by: ${msg.author.tag}`,
                iconURL: msg.author.displayAvatarURL(Hina.imageOption),
            })
            .setTimestamp();

        await msg.reply({ embeds: [embed] });
    }
}
