import { Message, NewsChannel, TextChannel } from 'discord.js';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import { hinaImageOption } from '../../res/config.js';

export default class usemoji implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'usemoji';
        this.description = 'use animated emojis.';
        this.commandUsage = '<emoji_id>';
        this.args = [
            new CommandArgument()
                .setName('emoji_id')
                .setDescription('full emoji id without `<>`, can get using `getemoji` command.')
                .setRegex(/^a?:.+:([0-9]{18})$/),
        ];
    }

    async execute(msg: Message, args: string[]) {
        const [emoji_id] = args;

        if (!(msg.channel instanceof NewsChannel || msg.channel instanceof TextChannel)) return;
        const webhook = await msg.channel.createWebhook(msg.member!.displayName, {
            avatar: msg.author.displayAvatarURL(hinaImageOption),
        });

        await webhook.send(`<${emoji_id}>`);
        await webhook.delete();
        await msg.delete();
    }
}
