module.exports = {

    eventType: 'messageCreate',
    callback: async (msg) => {
        
        const greets = [
            'hello',
            'hi',
            'yo',
            'sup',
            'wassup',
            'yahhallo',
            'nyahhallo',
            'こんにちは',
            'おはよう',
            'こんばんは',
            'ハロー',
            'おっす',
            'にゃっはろー',
            'やっはろー',
            'にゃんぱすー'
        ];

        if (greets.includes(msg.content.toLowerCase())) {
            await msg.channel.send(`${msg}, ${msg.author.toString()}!`);
        }

    }
};