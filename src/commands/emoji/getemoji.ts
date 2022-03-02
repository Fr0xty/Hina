import { Message, MessageEmbed } from 'discord.js';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import { Hina, hinaColor, hinaImageOption } from '../../res/config.js';
import { paginator } from '../../utils/paginator.js';

export default class getemoji implements BaseCommand {
    name: String;
    description: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'getemoji';
        this.description = 'get all emojis.';
        this.args = [
            new CommandArgument({ optional: true })
                .setName('server_id')
                .setDescription('server id of the emoji hosting server.')
                .setRegex(/^[0-9]{18}$/),
        ];
    }

    async execute(msg: Message, args: any) {
        let guild;
        if (!args.length) {
            guild = msg.guild;
        } else {
            try {
                guild = await Hina.guilds.fetch(args[0]);
            } catch {
                return await msg.reply("Invalid server id / I'm not in the server.");
            }
        }

        let guildEmoji;
        try {
            guildEmoji = await guild!.emojis.fetch();
        } catch {
            return await msg.reply("I'm not in the server!");
        }
        const emojiAmount = guildEmoji.size;
        if (!emojiAmount) return await msg.reply("The server doesn't have any emoji!");

        const pageAmount = Math.ceil(emojiAmount / 20);
        let pages = [];
        let page = '';
        let _ = 0;
        for (const [id, emoji] of guildEmoji.entries()) {
            page += `${emoji}- \`${emoji}\`\n`;
            _++;

            if (_ === 20) {
                const embed: MessageEmbed = new MessageEmbed()
                    .setColor(hinaColor)
                    .setAuthor({
                        name: `${Hina.user!.username} Page ${pages.length + 1} / ${pageAmount}`,
                        iconURL: Hina.user!.displayAvatarURL(hinaImageOption),
                    })
                    .setTitle(`Emoji Id(s) for ${guild!.name} [${emojiAmount}]`)
                    .setDescription(page)
                    .setFooter({
                        text: `Requested by: ${msg.author.tag}`,
                        iconURL: msg.author.displayAvatarURL(hinaImageOption),
                    })
                    .setTimestamp();

                pages.push(embed);
                page = '';
                _ = 0;
            }
        }
        if (_) {
            const embed = new MessageEmbed()
                .setColor(hinaColor)
                .setAuthor({
                    name: `${Hina.user!.username} Page ${pages.length + 1} / ${pageAmount}`,
                    iconURL: Hina.user!.displayAvatarURL(hinaImageOption),
                })
                .setTitle(`Emoji Id(s) for ${guild!.name} [${emojiAmount}]`)
                .setDescription(page)
                .setFooter({
                    text: `Requested by: ${msg.author.tag}`,
                    iconURL: msg.author.displayAvatarURL(hinaImageOption),
                })
                .setTimestamp();

            pages.push(embed);
        }

        await paginator(msg, pages, 120_000);
    }
}
