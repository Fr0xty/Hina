import { Client, Message, EmbedBuilder, CommandInteraction } from 'discord.js';

import CommandArgument from '../../res/models/CommandArgument.js';
import { BaseCommand } from 'hina';
import { interactionPaginator, paginator } from '../../utils/paginator.js';

export default class getemoji implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

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

    async execute(Hina: Client, msg: Message, args: string[]) {
        const [server_id] = args;

        try {
            const guild = server_id ? await Hina.guilds.fetch(server_id) : msg.guild;
            const guildEmoji = await guild!.emojis.fetch();
            if (!guildEmoji.size) return await msg.reply("The server doesn't have any emoji!");
            const emojiAmount = guildEmoji.size;

            // make pages
            const pageAmount = Math.ceil(emojiAmount / 20);
            let pages = [];
            let page = '';
            let _ = 0;

            for (const [id, emoji] of guildEmoji.entries()) {
                page += `${emoji}- \`${emoji}\`\n`;
                _++;

                if (_ === 20) {
                    const embed: EmbedBuilder = new EmbedBuilder()
                        .setColor(Hina.color)
                        .setAuthor({
                            name: `${Hina.user!.username} Page ${pages.length + 1} / ${pageAmount}`,
                            iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
                        })
                        .setTitle(`Emoji Id(s) for ${guild!.name} [${emojiAmount}]`)
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
                const embed = new EmbedBuilder()
                    .setColor(Hina.color)
                    .setAuthor({
                        name: `${Hina.user!.username} Page ${pages.length + 1} / ${pageAmount}`,
                        iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
                    })
                    .setTitle(`Emoji Id(s) for ${guild!.name} [${emojiAmount}]`)
                    .setDescription(page)
                    .setFooter({
                        text: `Requested by: ${msg.author.tag}`,
                        iconURL: msg.author.displayAvatarURL(Hina.imageOption),
                    })
                    .setTimestamp();

                pages.push(embed);
            }

            await paginator(msg, pages, 120_000);
        } catch {
            return await msg.reply("Invalid server id / I'm not in that server!");
        }
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const server_id = interaction.options.get('server_id')?.value;

        try {
            const guild = server_id !== undefined ? await Hina.guilds.fetch(server_id.toString()) : interaction.guild;
            const guildEmoji = await guild!.emojis.fetch();
            if (!guildEmoji.size) return await interaction.reply("The server doesn't have any emoji!");
            const emojiAmount = guildEmoji.size;

            // make pages
            const pageAmount = Math.ceil(emojiAmount / 20);
            let pages = [];
            let page = '';
            let _ = 0;

            for (const [id, emoji] of guildEmoji.entries()) {
                page += `${emoji}- \`${emoji}\`\n`;
                _++;

                if (_ === 20) {
                    const embed: EmbedBuilder = new EmbedBuilder()
                        .setColor(Hina.color)
                        .setAuthor({
                            name: `${Hina.user!.username} Page ${pages.length + 1} / ${pageAmount}`,
                            iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
                        })
                        .setTitle(`Emoji Id(s) for ${guild!.name} [${emojiAmount}]`)
                        .setDescription(page)
                        .setFooter({
                            text: `Requested by: ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
                        })
                        .setTimestamp();

                    pages.push(embed);
                    page = '';
                    _ = 0;
                }
            }
            if (_) {
                const embed = new EmbedBuilder()
                    .setColor(Hina.color)
                    .setAuthor({
                        name: `${Hina.user!.username} Page ${pages.length + 1} / ${pageAmount}`,
                        iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
                    })
                    .setTitle(`Emoji Id(s) for ${guild!.name} [${emojiAmount}]`)
                    .setDescription(page)
                    .setFooter({
                        text: `Requested by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
                    })
                    .setTimestamp();

                pages.push(embed);
            }

            await interactionPaginator(interaction, pages, 120_000);
        } catch {
            return await interaction.reply("Invalid server id / I'm not in that server!");
        }
    }
}
