import CommandArgument from '../../res/models/CommandArgument.js';
export default class reactemoji {
    name;
    description;
    commandUsage;
    args;
    constructor() {
        this.name = 'reactemoji';
        this.description = 'react to message using the emoji id.';
        this.commandUsage = '<emoji_id>';
        this.args = [
            new CommandArgument()
                .setName('emoji_id')
                .setDescription('full emoji id without `<>`, can get using `getemoji` command.'),
        ];
    }
    async execute(msg, args) {
        const [emoji_id] = args;
        if (!msg.reference)
            return await msg.reply('Please reply to the message you want to react to while using the command!');
        if (!args)
            return await msg.reply('Please provide the emoji id.');
        const theMsg = await msg.fetchReference();
        try {
            await theMsg.react(emoji_id);
            await msg.delete();
        }
        catch {
            await msg.reply(`Invalid emoji id: ${emoji_id}`);
        }
    }
}
