import { BaseCommand } from 'hina';
import { Hina, prefix } from '../res/config.js';
import { validateArgument } from '../utils/command.js';

// TODO add nice embeds for each errors

/**
 * handles every command starting with 'hina ' prefix
 */
Hina.on('messageCreate', async (msg): Promise<any> => {
    /**
     * filter out bots and no prefix
     */
    if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot) return;

    /**
     * extract commandName: String and args: String[]
     * if !commandName -> just prefix, return;
     */
    const noPrefixMsg = msg.content.slice(prefix.length).trim();
    const args = noPrefixMsg?.split(/ +/);
    if (!args) return;
    const commandName = args.shift()!.toLowerCase();

    /**
     * get command from Collection, return error if no such command
     */
    const command: BaseCommand = Hina.commands.get(commandName);
    if (!command)
        return await msg.reply(
            `Sorry, there's no command named: \`${commandName}\`.\nDo \`hina help\` for more information.`
        );

    /**
     * validate command arguments if theres any
     */
    const structuredArguments: string[] = [];
    if (command.args) {
        // loop through all arguments
        for (let i = 0; i < command.args.length; i++) {
            // missing required argument
            if (!command.args[i].optional && !args.length)
                return await msg.reply(`missing arg named ${command.args[i].name}`);
            // optional argument not provided, break because cannot have arguments behind optional arguments
            if (command.args[i].optional && !args.length) break;

            // optional + provided & required + provided
            command.args[i].type === 'word'
                ? // word: get 1 item from array
                  structuredArguments.push(args.shift()!)
                : // paragraph: get every item as 1 string
                  structuredArguments.push(args.join(' '));

            // validate the argument
            const validateResult = validateArgument(structuredArguments.at(-1)!, command.args[i]);
            if (!validateResult) return await msg.reply(`invalid argument for ${command.args[i].name}`);
            /**
             * break because cannot have more args behind
             * -optional args
             * -args typed 'paragraph'
             */
            if (command.args[i].optional || command.args[i].type === 'paragraph') break;
        }
    }

    /**
     * running the command
     */
    try {
        await command.execute(msg, commandName, structuredArguments);
    } catch (err) {
        console.log('\n-----------------------\n');
        console.log(err);
        return await msg.reply('Sorry, something went wrong.');
    }
});
