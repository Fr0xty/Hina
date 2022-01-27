const { MessageEmbed } = require('discord.js');
const { hinaColor } = require('../res/config');


module.exports = [

    {
        name: 'hi',
        description: 'hiii',
        async execute(client, msg, args) {
            
            await msg.channel.send(msg.author.defaultAvatarURL({}));
        }
    }

];