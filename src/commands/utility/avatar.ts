import { Client, Message, EmbedBuilder } from 'discord.js';

import CommandArgument from '../../res/models/CommandArgument.js';
import { BaseCommand } from 'hina';

export default class avatar implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'avatar';
        this.description = 'get user profile avatar.';
        this.commandUsage = '[@user/user_id]';
        this.args = [
            new CommandArgument({ optional: true })
                .setName('user')
                .setDescription('user of the avatar you want to get, leaving blank will default to yourself.')
                .setRegex(/^(<@)?!?[0-9]{18}>?$/),
        ];
    }

    async execute(Hina: Client, msg: Message, args: string[]) {
        const [user] = args;

        const User = user ? await Hina.users.fetch(user.match(/\d+/)![0]) : msg.author;
        if (!User) return await msg.reply('Invalid user id / mention!');

        const embed = new EmbedBuilder()
            .setColor(Hina.color)
            .setAuthor({ name: "Hina's Avatar Fetcher", iconURL: Hina.user!.displayAvatarURL(Hina.imageOption) })
            .setTitle(`${User.tag}'s Avatar'`)
            .setDescription(
                `
[\`webp\`](${User.displayAvatarURL({
                    dynamic: true,
                    format: 'webp',
                    size: 4096,
                })}) [\`png\`](${User.displayAvatarURL({
                    dynamic: true,
                    format: 'png',
                    size: 4096,
                })}) [\`jpg\`](${User.displayAvatarURL({
                    dynamic: true,
                    format: 'jpg',
                    size: 4096,
                })}) [\`jpeg\`](${User.displayAvatarURL({
                    dynamic: true,
                    format: 'jpeg',
                    size: 4096,
                })})
            `
            )
            .setImage(User.displayAvatarURL(Hina.imageOption))
            .setFooter({
                text: `Requested by: ${msg.author.tag}`,
                iconURL: msg.author.displayAvatarURL(Hina.imageOption),
            })
            .setTimestamp();

        await msg.reply({ embeds: [embed] });
    }
}
