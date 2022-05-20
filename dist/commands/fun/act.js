import CommandArgument from '../../res/models/CommandArgument.js';
import { Hina } from '../../res/config.js';
import { NewsChannel, TextChannel } from 'discord.js';
export default class act {
    name;
    description;
    commandUsage;
    args;
    constructor() {
        this.name = 'act';
        this.description = 'act as someone to say dumb things.';
        this.commandUsage = '<@user> <msg>';
        this.args = [
            new CommandArgument()
                .setName('user')
                .setDescription('mention user to impersonate.')
                .setRegex(/^(<@)?!?[0-9]{18}>?$/),
            new CommandArgument({ type: 'paragraph' }).setName('msg').setDescription('text to say.'),
        ];
    }
    async execute(msg, args) {
        const [user, message] = args;
        const member = msg.mentions.members?.first();
        if (!member)
            return await msg.reply('User is invalid or is not in the server!');
        if (!(msg.channel instanceof NewsChannel || msg.channel instanceof TextChannel))
            return;
        const webhook = await msg.channel.createWebhook(member.displayName, {
            avatar: member.displayAvatarURL(Hina.imageOption),
        });
        await webhook.send(message);
        await webhook.delete();
        await msg.delete();
    }
}
