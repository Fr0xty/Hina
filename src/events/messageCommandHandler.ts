import { EmbedBuilder } from 'discord.js';

import Hina from '../res/HinaClient.js';
import BaseCommand from '../res/models/BaseCommand.js';
import { validateArgument } from '../utils/command.js';

/**
 * handles every command starting with 'hina ' prefix
 */
Hina.on('messageCreate', async (msg): Promise<any> => {
    /**
     * filter out bots & no prefix & non guild channels
     */
    if (!msg.content.toLowerCase().startsWith(Hina.prefix) || msg.author.bot || !msg.guild) return;

    /**
     * extract commandName: String and args: String[]
     * if !commandName -> just prefix, return;
     */
    const noPrefixMsg = msg.content.slice(Hina.prefix.length).trim();
    const args = noPrefixMsg?.split(/ +/);
    if (!args) return;
    const commandName = args.shift()!.toLowerCase().replace(/\s+/g, '');

    /**
     * get command from Collection, return error embed if no such command
     */
    const command = Hina.commands.get(commandName);
    if (!command) {
        const embed = new EmbedBuilder()
            .setColor(Hina.color)
            .setTitle(
                `No command named "${
                    commandName.length < 10 ? commandName : commandName.slice(0, 10).concat('...')
                }" found`
            )
            .setDescription('Use `hina help` for more information about my commands.')
            .setFooter({ text: `Invoked by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL() })
            .setTimestamp();
        return await msg.reply({ embeds: [embed] });
    }

    //     /**
    //      * validate command arguments if theres any
    //      */
    //     const structuredArguments: string[] = [];
    //     if (command.args) {
    //         // loop through all arguments
    //         for (let i = 0; i < command.args.length; i++) {
    //             // missing required argument
    //             if (!command.args[i].optional && !args.length) {
    //                 const embed = new EmbedBuilder()
    //                     .setColor(Hina.color)
    //                     .setTitle(`Missing command argument "${command.args[i].name}"`)
    //                     .setDescription(
    //                         `
    // **Command usage:**
    // \`hina ${command.name} ${command.commandUsage}\`

    // Missing: \`${command.args[i].name}\`
    // __Description:__
    // ${command.args[i].description}`
    //                     )
    //                     .setFooter({ text: `Invoked by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL() })
    //                     .setTimestamp();
    //                 return await msg.reply({ embeds: [embed] });
    //             }
    //             // optional argument not provided, break because no more args
    //             if (command.args[i].optional && !args.length) break;

    //             // optional + provided & required + provided
    //             command.args[i].type === 'word'
    //                 ? // word: get 1 item from array
    //                   structuredArguments.push(args.shift()!.trim())
    //                 : // paragraph: get every item as 1 string
    //                   structuredArguments.push(args.join(' ').trim());

    //             // validate the argument
    //             const validateResult = validateArgument(structuredArguments.at(-1)!, command.args[i]);
    //             if (!validateResult) {
    //                 const embed = new EmbedBuilder()
    //                     .setColor(Hina.color)
    //                     .setTitle(`Invalid argument for "${command.args[i].name}"`)
    //                     .setDescription(
    //                         `
    // **Command usage:**
    // \`hina ${command.name} ${command.commandUsage}\`

    // **${command.args[i].name}**
    // > ${command.args[i].description}

    // **Given:** \`${structuredArguments.at(-1)}\``
    //                     );
    //                 return await msg.reply({ embeds: [embed] });
    //             }
    //             /**
    //              * break because cannot have more args behind args typed 'paragraph'
    //              */
    //             if (command.args[i].type === 'paragraph') break;
    //         }
    //     }

    //     /**
    //      * running the command
    //      */
    //     try {
    //         await command.execute(Hina, msg, structuredArguments);
    //     } catch (err) {
    //         console.log('\n-----------------------\n');
    //         console.log(err);
    //         return await msg.reply('Sorry, something went wrong.');
    //     }
});
