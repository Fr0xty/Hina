import Hina from '../res/HinaClient.js';

Hina.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

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
        'にゃんぱすー',
    ];

    if (greets.includes(msg.content.toLowerCase())) {
        await msg.reply(`${msg}, ${msg.author}!`);
    }
});
