import { MessageEmbed } from 'discord.js';
import { Hina } from '../res/config.js';
import { validateArgument } from '../utils/command.js';
Hina.on('messageCreate', async (msg) => {
    if (!msg.content.toLowerCase().startsWith(Hina.prefix) || msg.author.bot || !msg.guild)
        return;
    const noPrefixMsg = msg.content.slice(Hina.prefix.length).trim();
    const args = noPrefixMsg?.split(/ +/);
    if (!args)
        return;
    const commandName = args.shift().toLowerCase().replace(/\s+/g, '');
    const command = Hina.commands.get(commandName);
    if (!command) {
        const embed = new MessageEmbed()
            .setColor(Hina.color)
            .setTitle(`No command named "${commandName.length < 10 ? commandName : commandName.slice(0, 10).concat('...')}" found`)
            .setDescription('Use `hina help` for more information about my commands.')
            .setFooter({ text: `Invoked by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL() })
            .setTimestamp();
        return await msg.reply({ embeds: [embed] });
    }
    const structuredArguments = [];
    if (command.args) {
        for (let i = 0; i < command.args.length; i++) {
            if (!command.args[i].optional && !args.length) {
                const embed = new MessageEmbed()
                    .setColor(Hina.color)
                    .setTitle(`Missing command argument "${command.args[i].name}"`)
                    .setDescription(`
**Command usage:**
\`hina ${command.name} ${command.commandUsage}\`

Missing: \`${command.args[i].name}\`
__Description:__
${command.args[i].description}`)
                    .setFooter({ text: `Invoked by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL() })
                    .setTimestamp();
                return await msg.reply({ embeds: [embed] });
            }
            if (command.args[i].optional && !args.length)
                break;
            command.args[i].type === 'word'
                ?
                    structuredArguments.push(args.shift().trim())
                :
                    structuredArguments.push(args.join(' ').trim());
            const validateResult = validateArgument(structuredArguments.at(-1), command.args[i]);
            if (!validateResult) {
                const embed = new MessageEmbed()
                    .setColor(Hina.color)
                    .setTitle(`Invalid argument for "${command.args[i].name}"`)
                    .setDescription(`
**Command usage:**
\`hina ${command.name} ${command.commandUsage}\`

**${command.args[i].name}**
> ${command.args[i].description}

**Given:** \`${structuredArguments.at(-1)}\``);
                return await msg.reply({ embeds: [embed] });
            }
            if (command.args[i].type === 'paragraph')
                break;
        }
    }
    try {
        await command.execute(msg, structuredArguments);
    }
    catch (err) {
        console.log('\n-----------------------\n');
        console.log(err);
        return await msg.reply('Sorry, something went wrong.');
    }
});
