import { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, User } from 'discord.js';
import { Hina } from '../config.js';

export class Help {
    author: User;
    categories: string[];
    components: {
        actionRow: MessageActionRow;
        selectCategory: MessageActionRow;
        linkRow: MessageActionRow;
    };

    mainPage: MessageEmbed;
    behavoiral: MessageEmbed;
    general: MessageEmbed;
    fun: MessageEmbed;
    emoji: MessageEmbed;
    music: MessageEmbed;
    image: MessageEmbed;
    language: MessageEmbed;
    utility: MessageEmbed;
    coderunner: MessageEmbed;

    constructor(author: User, _hinaInvite: string) {
        this.author = author;
        this.categories = [
            'behavoiral',
            'general',
            'fun',
            'emoji',
            'music',
            'image',
            'language',
            'utility',
            'coderunner',
            // 'creator',
        ];

        this.components = {
            actionRow: new MessageActionRow().addComponents(
                new MessageButton().setCustomId('mainPage').setLabel('Main Page').setStyle('PRIMARY').setDisabled(true),

                new MessageButton().setCustomId('delete').setLabel('Delete').setStyle('DANGER')
            ),

            selectCategory: new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Select your command category!')
                    .addOptions([
                        {
                            label: 'Behavoiral',
                            description: "I'm a human too, b..baka!",
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
                            label: 'Language',
                            description: 'Commands related to languages.',
                            emoji: '🌏',
                            value: 'language',
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
                    ])
            ),

            linkRow: new MessageActionRow().addComponents(
                new MessageButton()
                    .setLabel('Invite me!')
                    .setStyle('LINK')
                    .setURL(_hinaInvite)
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
                    .setEmoji('<:github:913019791743262772>')
            ),
        };

        this.mainPage = new MessageEmbed()
            .setAuthor({
                name: `${Hina.user!.username} Commands!`,
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .setTitle('Command Categories')
            .setDescription(
                `
My commands are categorized for simpler searching and understanding.

My prefix is \`hina\`
\`\`\`<> = Required, [] = Optional.\`\`\`
            `
            )
            .addFields(
                { name: '<:Blushing:900570132210929715> Behavoiral', value: '`hina help behavoiral`', inline: true },
                { name: '<a:GuraFlap:885845968120066070> General', value: '`hina help general`', inline: true },
                { name: '<a:CATDANCE:885845964835926047> Fun', value: '`hina help fun`', inline: true },
                { name: '<a:dekuHYPE:885845965469253632> Emoji', value: '`hina help emoji`', inline: true },
                { name: '🎶 Music', value: '`hina help music`', inline: true },
                { name: '<:TGGasm:895182438064590879> Image', value: '`hina help image`', inline: true },
                { name: '🌏 Language', value: '`hina help language`', inline: true },
                { name: '🛠️ Utility', value: '`hina help utility`', inline: true },
                { name: '🎲 Code Runner', value: '`hina help coderunner`', inline: true }
            )
            .setFooter({
                text: `Requested by: ${this.author.tag}`,
                iconURL: this.author.displayAvatarURL(Hina.imageOption),
            })
            .setTimestamp();

        this.behavoiral = new MessageEmbed()
            .setAuthor({
                name: `${Hina.user!.username} Behavoiral Category`,
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .addFields(
                {
                    name: 'Greetings',
                    value: 'If you use any of the following greetings, I will greet you back!\n`hello`, `hi`, `yo`, `sup`, `wassup`, `yahhallo`, `nyahhallo`, `こんにちは`, `おはよう`, `こんばんは`, `ハロー`, `おっす`, `にゃっはろー`, `やっはろー`, `にゃんぱすー`',
                },
                {
                    name: 'Animated Emoji',
                    value: 'writing `;<emoji_name>;` will automatically convert into you sending the emoji!\n__Example:__\nemoji name: `nom`\nwhat to write: `;nom;`',
                }
            )
            .setFooter({
                text: 'These are triggered by keywords, not actual commands.',
                iconURL:
                    'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png',
            });

        this.general = new MessageEmbed()
            .setAuthor({
                name: `${Hina.user!.username} General Category`,
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .addFields(
                { name: '`help [category]`', value: 'get this help embed.', inline: true },
                { name: '`invite`', value: 'get my invite link.', inline: true },
                { name: '`spotify [@user/userid]`', value: 'get user spotify listening info.', inline: true }
            )
            .setFooter({
                text: '<> = Required, [] = Optional',
                iconURL:
                    'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png',
            });

        this.fun = new MessageEmbed()
            .setAuthor({
                name: `${Hina.user!.username} Fun Category`,
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .addFields(
                { name: '`funfact`', value: 'get a fun fact!', inline: true },
                { name: '`joke`', value: 'Allow me to tell you a joke.', inline: true },
                { name: '`act <@user> <msg>`', value: 'I will impersonate the user to say things.', inline: true }
            )
            .setFooter({
                text: '<> = Required, [] = Optional',
                iconURL:
                    'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png',
            });

        this.emoji = new MessageEmbed()
            .setAuthor({
                name: `${Hina.user!.username} Fun Category`,
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .setThumbnail(
                'https://media.discordapp.net/attachments/907586559719645204/938784511838273586/nitro_perk.png'
            )
            .setTitle('Use the nitro emoji perks!')
            .setDescription(
                `
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
            `
            )
            .setFooter({
                text: '<> = Required, [] = Optional',
                iconURL:
                    'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png',
            });

        this.music = new MessageEmbed()
            .setAuthor({
                name: `${Hina.user!.username} Fun Category`,
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .addFields(
                { name: '`play <query/url>`', value: 'Add music to queue.', inline: true },
                { name: '`join`', value: 'I will join your voice channel.', inline: true },
                { name: '`leave`', value: 'I will leave your voice channel.', inline: true },
                { name: '`pause`', value: 'pause the current song.', inline: true },
                { name: '`resume`', value: 'resume the current song.', inline: true },
                { name: '`skip`', value: 'skip the current song.', inline: true },
                { name: '`queue`, `q`', value: 'get song queue of the server.', inline: true },
                { name: '`clearqueue`, `clearq`', value: 'clear server song queue.', inline: true },
                { name: '`nowplaying`, `np`', value: 'get now playing song.', inline: true }
            )
            .setFooter({
                text: '<> = Required, [] = Optional',
                iconURL:
                    'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png',
            });

        this.image = new MessageEmbed()
            .setAuthor({
                name: `${Hina.user!.username} Image Category`,
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .setTitle('Get images with the following tags.')
            .setDescription(
                `
The API used: 
https://waifu.im/
https://waifu.pics/
⠀
**Note:**
\`<tag> [amount]\`
This can be applied to every command in this category. Must be \`>0\` and \`<31\`.
\u2800
\u2800
            `
            )
            .addFields(
                {
                    name: 'SFW',
                    value: '`waifu`, `uniform`, `maid`, `marin-kitagawa`, `mori-calliope`, `raiden-shogun`, `selfies`, `neko`, `shinobu`, `megumin`, `awoo`\n\u2800',
                },
                {
                    name: 'NSFW',
                    value: '`ass`, `ecchi`, `ero`, `hentai`, `milf`, `oral`, `paizuri`, `breast`, `nsfwmaid`, `nsfwuniform`, `nsfwwaifu`, `nsfwselfies`, `nsfwneko`, `trap`, `blowjob`\n\u2800\n\u2800',
                },
                { name: 'Wildcard!', value: '`random`, `nsfwrandom`\n\u2800' }
            )
            .setFooter({
                text: '<> = Required, [] = Optional',
                iconURL:
                    'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png',
            });

        this.language = new MessageEmbed()
            .setAuthor({
                name: `${Hina.user!.username} Language Category`,
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .addFields(
                {
                    name: '`translate [toLanguage] [fromLanguage]`',
                    value: 'reply to the message to translate,\nAccept only `ISO 639-1 & 2` language codes, [get here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)\ndefault {to: en, from: detect}',
                    inline: true,
                },
                { name: '`jisho <word>`', value: 'searches word on jisho.org', inline: true }
            )
            .setFooter({
                text: '<> = Required, [] = Optional',
                iconURL:
                    'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png',
            });

        this.utility = new MessageEmbed()
            .setAuthor({
                name: `${Hina.user!.username} Utility Category`,
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .addFields(
                { name: '`appinfo`', value: 'Get my information!', inline: true },
                { name: '`userinfo [@user/userid]`', value: 'Get my information!', inline: true },
                { name: '`avatar [@user/userId]`', value: "get user's profile avatar.", inline: true },
                { name: '`epochtime`, `epoch`', value: 'get a quick example of epochtime.', inline: true },
                { name: '`prune [number]`', value: 'delete a certain amount of messages in the channel.', inline: true }
            )
            .setFooter({
                text: '<> = Required, [] = Optional',
                iconURL:
                    'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png',
            });

        this.coderunner = new MessageEmbed()
            .setAuthor({
                name: `${Hina.user!.username} Code Runner Category`,
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .addFields({
                name: 'How to use?',
                value: `
\`hina repl <code block with syntax highlighting>\`

The following picture is an example. Replace \`py\` with the language you want to use. More on Discord code blocks [here](https://gist.github.com/matthewzring/9f7bbfd102003963f9be7dbcf7d40e51#syntax-highlighting).
                
List of languages [here](https://hina.fr0xty.repl.co/help/runtimes). Both language and aliases are usable.
                `,
            })
            .setImage(
                'https://media.discordapp.net/attachments/907586559719645204/949567262359183401/BESTGIRLLLLLLLLL.png'
            )
            .setFooter({
                text: '<> = Required, [] = Optional',
                iconURL:
                    'https://media.discordapp.net/attachments/907586559719645204/913010359936372746/amasiro_natuki.png',
            });
    }
}
