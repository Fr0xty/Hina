import { MessageEmbed } from 'discord.js';
import CommandArgument from '../../res/models/CommandArgument.js';
import { Hina } from '../../res/config.js';
import { paginator } from '../../utils/paginator.js';
export default class getemoji {
    name;
    description;
    commandUsage;
    args;
    constructor() {
        this.name = 'getemoji';
        this.description = 'get all server emoji ids.';
        this.commandUsage = '[server_id]';
        this.args = [
            new CommandArgument({ optional: true })
                .setName('server_id')
                .setDescription('server id of the emoji hosting server.')
                .setRegex(/^[0-9]{18}$/),
        ];
    }
    async execute(msg, args) {
        const [server_id] = args;
        try {
            const guild = server_id ? await Hina.guilds.fetch(server_id) : msg.guild;
            const guildEmoji = await guild.emojis.fetch();
            if (!guildEmoji.size)
                return await msg.reply("The server doesn't have any emoji!");
            const emojiAmount = guildEmoji.size;
            const pageAmount = Math.ceil(emojiAmount / 20);
            let pages = [];
            let page = '';
            let _ = 0;
            for (const [id, emoji] of guildEmoji.entries()) {
                page += `${emoji}- \`${emoji}\`\n`;
                _++;
                if (_ === 20) {
                    const embed = new MessageEmbed()
                        .setColor(Hina.color)
                        .setAuthor({
                        name: `${Hina.user.username} Page ${pages.length + 1} / ${pageAmount}`,
                        iconURL: Hina.user.displayAvatarURL(Hina.imageOption),
                    })
                        .setTitle(`Emoji Id(s) for ${guild.name} [${emojiAmount}]`)
                        .setDescription(page)
                        .setFooter({
                        text: `Requested by: ${msg.author.tag}`,
                        iconURL: msg.author.displayAvatarURL(Hina.imageOption),
                    })
                        .setTimestamp();
                    pages.push(embed);
                    page = '';
                    _ = 0;
                }
            }
            if (_) {
                const embed = new MessageEmbed()
                    .setColor(Hina.color)
                    .setAuthor({
                    name: `${Hina.user.username} Page ${pages.length + 1} / ${pageAmount}`,
                    iconURL: Hina.user.displayAvatarURL(Hina.imageOption),
                })
                    .setTitle(`Emoji Id(s) for ${guild.name} [${emojiAmount}]`)
                    .setDescription(page)
                    .setFooter({
                    text: `Requested by: ${msg.author.tag}`,
                    iconURL: msg.author.displayAvatarURL(Hina.imageOption),
                })
                    .setTimestamp();
                pages.push(embed);
            }
            await paginator(msg, pages, 120_000);
        }
        catch {
            return await msg.reply("Invalid server id / I'm not in that server!");
        }
    }
}
