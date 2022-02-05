import {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu
} from 'discord.js';
import { hinaColor } from '../config.js';



export class Help {

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
            // 'creator',
        ];


        this.components = {

            actionRow: new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('mainPage')
                        .setLabel('Main Page')
                        .setStyle('PRIMARY')
                        .setDisabled(true),

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
                            }, /*
                            {
                                label: 'Creator',
                                description: 'Creator only / debugging commands.',
                                emoji: '885845967029551124',
                                value: 'creator',
                            },*/
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
            .setAuthor({name: `${this.client.user.username} Commands!`, iconURL: this.client.user.displayAvatarURL({size: 4096})})
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
            .setFooter({text: `Requested by: ${this.author.tag}`, iconURL: this.author.displayAvatarURL({size: 4096, dynamic: true})})
            .setTimestamp();



        this.behavoiral = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} Behavoiral Category`, iconURL: this.client.user.displayAvatarURL({size: 4096})})
            .setColor(hinaColor)
            .addFields(
                {name: 'Greetings', value: 'If you use any of the following greetings, I will greet you back!\n`hello`, `hi`, `yo`, `sup`, `wassup`, `yahhallo`, `nyahhallo`, `こんにちは`, `おはよう`, `こんばんは`, `ハロー`, `おっす`, `にゃっはろー`, `やっはろー`, `にゃんぱすー`'},
                {name: 'Animated Emoji', value: 'writing `;<emoji_name>;` will automatically convert into you sending the emoji!\n__Example:__\nemoji name: `nom`\nwhat to write: `;nom;`'}
            )
            .setFooter({text: 'These are triggered by keywords, not actual commands.', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'})



        this.general = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} General Category`, iconURL: this.client.user.displayAvatarURL({size: 4096})})
            .setColor(hinaColor)
            .addFields(
                {name: '`help [category]`', value: 'get this help embed.', inline: true},
                {name: '`invite`', value: 'get my invite link.', inline: true},
                {name: '`spotify [@user/userid]`', value: 'get user spotify listening info.', inline: true},
                {name: '`translate <language> <text / reply to msg>`', value: 'translate your text or a message.', inline: true},
            )
            .setFooter({text: '<> = Required, [] = Optional', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'});



        this.fun = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} Fun Category`, iconURL: this.client.user.displayAvatarURL({size: 4096})})
            .setColor(hinaColor)
            .addFields(
                {name: '`funfact`', value: 'get a fun fact!', inline: true},
                {name: '`joke`', value: 'Allow me to tell you a joke.', inline: true},
                {name: '`act <@user> <msg>`', value: 'I will impersonate the user to say things.', inline: true},
            )
            .setFooter({text: '<> = Required, [] = Optional', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'});

        

        this.emoji = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} Fun Category`, iconURL: this.client.user.displayAvatarURL({size: 4096})})
            .setColor(hinaColor)
            .setThumbnail('https://media.discordapp.net/attachments/907586559719645204/938784511838273586/nitro_perk.png')
            .setTitle('Use the nitro emoji perks!')
            .setDescription(`
**;<emoji_name>;**
__only for native server emoji__

*Example:*
name of emoji- \`nom\`
use- \`;nom;\`

-------------------------------

\`getemoji [server_id]\`
get all server emoji id(s)

⠀
\`usemoji <emoji_id>\`
send the emoji as you! Remember to remove the angle brackets!

*Example:*
\`hina usemoji a:AquaBounce:884003530933944341\`

⠀
\`reactemoji <emoji_id>\`
react to message with the emoji
__reply to the message while using the command__
            `)
            .setFooter({text: '<> = Required, [] = Optional', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'});



        this.music = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} Fun Category`, iconURL: this.client.user.displayAvatarURL({size: 4096})})
            .setColor(hinaColor)
            .addFields(
                {name: '`play <YT_URL/search keywords>`', value: 'Add music to queue.', inline: true},
                {name: '`join`', value: 'I will join your voice channel.', inline: true},
                {name: '`leave`', value: 'I will leave your voice channel.', inline: true},
                {name: '`pause`', value: 'pause the current song.', inline: true},
                {name: '`resume`', value: 'resume the current song.', inline: true},
                {name: '`skip`', value: 'skip the current song.', inline: true},
                {name: '`queue`, `q`', value: 'get song queue of the server.', inline: true},
                {name: '`clearqueue`, `clearq`', value: 'clear server song queue.', inline: true},
            )
            .setFooter({text: '<> = Required, [] = Optional', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'});




        this.image = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} Image Category`, iconURL: this.client.user.displayAvatarURL({size: 4096})})
            .setColor(hinaColor)
            .setTitle('Get images with the following tags.')
            .setDescription(`
The API used: https://waifu.im/
⠀
**Note:**
\`<tag> [amount]\`
This can be applied to every command in this category. Must be >0 and <31.
\u2800
\u2800
            `)
            .addFields(
                {name: 'SFW', value: '`waifu`, `maid`\n\u2800'},
                {name: 'NSFW', value: '`ass`, `ecchi`, `ero`, `hentai`, `nsfwmaid`, `milf`, `oppai`, `oral`, `paizuri`, `selfies`, `uniform`\n\u2800\n\u2800'},
                {name: 'Wildcard!', value: '`random`\n\u2800'},
            )
            .setFooter({text: '<> = Required, [] = Optional', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'});



        this.utility = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} Utility Category`, iconURL: this.client.user.displayAvatarURL({size: 4096})})
            .setColor(hinaColor)
            .addFields(
                {name: '`appinfo`', value: 'Get my information!', inline: true},
                {name: '`userinfo [@user/userid]`', value: 'Get my information!', inline: true},
            )
            .setFooter({text: '<> = Required, [] = Optional', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'});



        this.coderunner = new MessageEmbed()
            .setAuthor({name: `${this.client.user.username} Code Runner Category`, iconURL: this.client.user.displayAvatarURL({size: 4096})})
            .setColor(hinaColor)
            .addFields(
                {name: 'category is coming soon', value: 'cominggggggggggggggggg', inline: true},
            )
            .setFooter({text: '<> = Required, [] = Optional', iconURL: 'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png'});
    };
    
};