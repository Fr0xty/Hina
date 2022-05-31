import { Message, MessageEmbed } from 'discord.js';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import Hina from '../../res/HinaClient.js';

export default class avatarhistory implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'avatarhistory';
        this.description = 'get the avatar history of a user.';
        this.commandUsage = '[@user/user_id]';
        this.args = [
            new CommandArgument({ optional: true })
                .setName('@user/user_id')
                .setDescription('the user to fetch avatar history, leave blank will default to yourself.')
                .setRegex(/^(<@)?!?[0-9]{18}>?$/),
        ];
    }

    async execute(msg: Message, args: string[]) {
        let [userId] = args;
        userId = userId ? userId.match(/[0-9]+/)![0] : msg.author.id;

        let theUser;
        try {
            theUser = await Hina.users.fetch(userId);
        } catch {
            return await msg.reply('Invalid userId!');
        }

        const embed = new MessageEmbed()
            .setColor(Hina.color)
            .setAuthor({ name: `${theUser.tag}'s Avatar History`, iconURL: theUser.displayAvatarURL() })
            .setDescription(`see them [HERE](https://Hina.fr0xty.repl.co/api/avatar-history/${userId})`)
            .setFooter({ text: `Requested by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL() })
            .setTimestamp();
        await msg.reply({ embeds: [embed] });
    }
}
