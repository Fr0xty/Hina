import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import { hinaImageOption } from '../../res/config.js';
import { Message, NewsChannel, TextChannel } from 'discord.js';

// TODO: fix avatar not working in webhook

export default class act implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'act';
        this.description = 'act as someone to say dumb things.';
        this.commandUsage = '<@user> <msg>';
        this.args = [
            new CommandArgument()
                .setName('user')
                .setDescription('mention user to impersonate.')
                .setRegex(/^<@!?[0-9]{18}>$/),
            new CommandArgument({ type: 'paragraph' }).setName('msg').setDescription('text to say.'),
        ];
    }

    async execute(msg: Message, args: string[]) {
        const [user, message] = args;

        // get mentioned member
        const member = msg.mentions.members?.first();
        if (!member) return await msg.reply('User is invalid or is not in the server!');

        // sending the message as user using webhook
        if (!(msg.channel instanceof NewsChannel || msg.channel instanceof TextChannel)) return;
        const webhook = await msg.channel.createWebhook(member.displayName, {
            avatar: member.displayAvatarURL(hinaImageOption),
        });
        await webhook.send(message);
        await webhook.delete();
        await msg.delete();
    }
}
