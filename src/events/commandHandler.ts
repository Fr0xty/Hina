import { Hina, prefix } from '../res/config.js';

Hina.on('messageCreate', async (msg): Promise<any> => {
    if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot) return;

    const noPrefixMsg = msg.content.slice(prefix.length).trim();
    const args = noPrefixMsg?.split(/ +/);
    if (!args) return;
    const commandName = args.shift()!.toLowerCase();

    const command = Hina.commands.get(commandName);
    if (!command)
        return await msg.reply(
            `Sorry, there's no command named: \`${commandName}\`.\nDo \`hina help\` for more information.`
        );

    try {
        command.execute();
    } catch {
        return await msg.reply('Sorry, something went wrong.');
    }
});
