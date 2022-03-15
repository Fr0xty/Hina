import CommandArgument from '../../res/models/CommandArgument.js';
export default class evaluation {
    name;
    description;
    commandUsage;
    args;
    constructor() {
        this.name = 'eval';
        this.description = 'run code in discord.';
        this.commandUsage = '<script>';
        this.args = [
            new CommandArgument({ type: 'paragraph' }).setName('script').setDescription('javascript code to run.'),
        ];
    }
    async execute(msg, args) {
        let [script] = args;
        script = script.trim();
        if (msg.author.id !== '395587171601350676')
            return;
        if (script.startsWith('```') && script.endsWith('```'))
            script = script.replace(/(^.*?\s)|(\n.*$)/g, '');
        try {
            let result = eval(`(async () => {${script}})()`);
        }
        catch (err) {
            console.log(err);
            await msg.reply(err.message);
        }
    }
}
