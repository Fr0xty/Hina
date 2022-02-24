import { MessageEmbed } from 'discord.js';
import piston from 'piston-client';

import { hinaColor, hinaImageOption } from '../../res/config.js';


export default {

    name: 'run',
    aliases: [],
    description: 'run code snippets in a sandbox.',





    async execute(Hina, msg, args) {
        args = args.join(' ');
        let code = args.replaceAll('```', '').trim();
        const lang = code.match(/.+/)[0];
        code = code.replace(/.+/, '');

        const pistonClient = piston({server: "https://emkc.org"});
        const runtimes = await pistonClient.runtimes();
        let language;
        runtimes.forEach(runtime => {
            if (runtime.aliases.includes(lang) || runtime.language === lang) language = runtime.language;
        });
        const result = await pistonClient.execute(language, code);

        let consoleMsg;
        if (result.run.stdout === '' && result.run.code === 0) {
            consoleMsg = 'Code ran with no exceptions...';
        }
        else if (result.run.code != 0) {
            consoleMsg = result.run.stderr;
        }
        else {
            consoleMsg = result.run.stdout;
        };
        
        const embed = new MessageEmbed()
            .setColor(hinaColor)
            .setAuthor({name: 'Hina\'s Code Runner', iconURL: Hina.user.displayAvatarURL(hinaImageOption)})
            .setDescription(`
\`\`\`\n${consoleMsg}\`\`\`

exit code: \`${result.run.code}\`

**Info:**
language: \`${result.language}\`
version: \`${result.version}\`
            `)
            .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
            .setTimestamp()

        await msg.reply({ embeds: [embed] });
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};