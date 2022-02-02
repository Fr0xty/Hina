const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { hinaColor } = require('../config');



class Help {

    constructor(client, author, _clientInvite) {
        this.client = client;
        this.author = author;
        this.categories = [
            'behavoiral',
            'general',
            'fun',
            'emoji',
            'music',
            'image',
            'utility',
            'coderunner',
            'creator',
        ];


        this.components = {

            actionRow: new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('mainPage')
                        .setLabel('Main Page')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('delete')
                        .setLabel('Delete')
                        .setStyle('DANGER'),
                ),
            

            selectCategory: new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder('Select your command category!')
                        .addOptions([
                            {
                                label: 'Behavoiral',
                                description: 'I\'m a human too, b..baka!',
                                emoji: '900570132210929715',
                                value: 'behavoiral',
                            },
                            {
                                label: 'General',
                                description: 'Basic or common commands.',
                                emoji: '885845968120066070',
                                value: 'general',
                            },
                            {
                                label: 'Fun',
                                description: 'Commands to mess with.',
                                emoji: '885845964835926047',
                                value: 'fun',
                            },
                            {
                                label: 'Emoji',
                                description: 'Free nitro perks for emoji.',
                                emoji: '885845965469253632',
                                value: 'emoji',
                            },
                            {
                                label: 'Music',
                                description: 'Play music in your channel.',
                                emoji: '🎶',
                                value: 'music',
                            },
                            {
                                label: 'Image',
                                description: 'Get all those waifu and hentai pics baby!',
                                emoji: '895182438064590879',
                                value: 'image',
                            },
                            {
                                label: 'Utility',
                                description: 'Useful commands.',
                                emoji: '🛠️',
                                value: 'utility',
                            },
                            {
                                label: 'Code Runner',
                                description: 'Sandbox for various programming languages.',
                                emoji: '🎲',
                                value: 'coderunner',
                            },
                            {
                                label: 'Creator',
                                description: 'Creator only / debugging commands.',
                                emoji: '885845967029551124',
                                value: 'creator',
                            },
                        ]),
                ),


                linkRow: new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('Invite me!')
                            .setStyle('LINK')
                            .setURL(_clientInvite)
                            .setEmoji('<a:AquaBounce:884003530933944341>'),

                        new MessageButton()
                            .setLabel('Join Server')
                            .setStyle('LINK')
                            .setURL('https://discord.gg/VtQRrVCxg8')
                            .setEmoji('<a:Koronom:885845966421372958>'),

                        new MessageButton()
                            .setLabel('Github Repo')
                            .setStyle('LINK')
                            .setURL('https://github.com/Fr0xty/Hina')
                            .setEmoji('<:github:913019791743262772>'),
                    ),
        };



        this.mainPage = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} Commands!`, iconURL: this.client.user.displayAvatarURL()})
            .setColor(hinaColor)
            .setTitle('Command Categories')
            .setDescription(`
                My commands are categorized for simpler searching and understanding.

                My prefix is \`hina\`
                \`\`\`<> = Required, [] = Optional.\`\`\`
            `)
            .addFields(
                {name: '<:Blushing:900570132210929715> Behavoiral', value: '`hina help behavoiral`', inline: true},
                {name: '<a:GuraFlap:885845968120066070> General', value: '`hina help general`', inline: true},
                {name: '<a:CATDANCE:885845964835926047> Fun', value: '`hina help fun`', inline: true},
                {name: '<a:dekuHYPE:885845965469253632> Emoji', value: '`hina help emoji`', inline: true},
                {name: '🎶 Music', value: '`hina help music`', inline: true},
                {name: '<:TGGasm:895182438064590879> Image', value: '`hina help image`', inline: true},
                {name: '🛠️ Utility', value: '`hina help utility`', inline: true},
                {name: '🎲 Code Runner', value: '`hina help coderunner`', inline: true}
            )
            .setFooter({text: `Requested by: ${this.author.tag}`, iconURL: this.author.displayAvatarURL()})
            .setTimestamp();



        this.behavoiral = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} Behavoiral Category`, iconURL: this.client.user.displayAvatarURL()})
            .setColor(hinaColor)
            .addFields(
                {name: 'Greetings', value: 'If you use any of the following greetings, I will greet you back!\n`hello`, `hi`, `yo`, `sup`, `wassup`, `yahhallo`, `nyahhallo`, `こんにちは`, `おはよう`, `こんばんは`, `ハロー`, `おっす`, `にゃっはろー`, `やっはろー`, `にゃんぱすー`'},
                {name: 'Animated Emoji', value: 'writing `;<emoji_name>;` will automatically convert into you sending the emoji!\n__Example:__\nemoji name: `nom`\nwhat to write: `;nom;`'}
            )
            .setFooter({text: 'These are triggered by keywords, not actual commands.', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'})



        this.general = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} General Category`, iconURL: this.client.user.displayAvatarURL()})
            .setColor(hinaColor)
            .addFields(
                {name: '`help [category]`', value: 'get this help embed.', inline: true},
                {name: '`invite`', value: 'get my invite link.', inline: true},
                {name: '`spotify [@user/userid]`', value: 'get user spotify listening info.', inline: true},
                {name: '`translate <language> <text / reply to msg>`', value: 'translate your text or a message.', inline: true},
            )
            .setFooter({text: '<> = Required, [] = Optional', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'});



        this.fun = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} Fun Category`, iconURL: this.client.user.displayAvatarURL()})
            .setColor(hinaColor)
            .addFields(
                {name: '`funfact`', value: 'get a fun fact!', inline: true},
                {name: '`joke`', value: 'Allow me to tell you a joke.', inline: true},
                {name: '`act <@user> <msg>`', value: 'I will impersonate the user to say things.', inline: true},
            )
            .setFooter({text: '<> = Required, [] = Optional', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'});

    };
    
};

module.exports = {
    Help: Help,
};