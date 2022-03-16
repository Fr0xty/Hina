import { Message, MessageEmbed } from 'discord.js';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import fetch from 'node-fetch';
import { Hina } from '../../res/config.js';

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

        const req = await fetch(`https://Hina.fr0xty.repl.co/Hina/fetch-avatar-history/${userId}`);

        if (req.status !== 200)
            return await msg.reply(`
The user is not registered in database.

Either the user does not share a common server, or if the user does(for some reason the user is not registered automatically), try to change your profile picture to register.
        `);

        const theUser = await Hina.users.fetch(userId);
        const embed = new MessageEmbed()
            .setColor(Hina.color)
            .setAuthor({ name: `${theUser.tag}'s Avatar History`, iconURL: theUser.displayAvatarURL() })
            .setDescription(`see them [HERE](https://Hina.fr0xty.repl.co/api/avatar-history/${userId})`)
            .setFooter({ text: `Requested by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL() })
            .setTimestamp();
        await msg.reply({ embeds: [embed] });
    }
}
