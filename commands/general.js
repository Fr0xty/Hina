const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { hinaColor } = require('../res/config');
const { generateClientInvite } = require('../utils/general');


module.exports = [

    {
        name: 'invite',
        description: 'Get my invite link.',
        async execute(client, msg, args) {
            
            const clientInvite = generateClientInvite(client);

            const embed = new MessageEmbed()
                .setAuthor({name: 'My invite link♡', iconURL: client.user.avatarURL()})
                .setColor(hinaColor)
                .setDescription(clientInvite)
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.avatarURL()})
                .setTimestamp();

            const button = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Invite Me!')
                        .setStyle('LINK')
                        .setURL(clientInvite)
                        .setEmoji('<a:AquaBounce:884003530933944341>')
                );

            await msg.channel.send({ embeds: [embed], components: [button] });
        }
    },
    


    {
        name: 'spotify',
        description: 'testing stuff',
        async execute(client, msg, args) {

            let member;
            const activities = msg.member.presence.activities;

            if (args.length == 0) { member = msg.member }
            else {
                try {
                    member = await msg.guild.members.fetch({user: args[0].match(/[0-9]+/)[0], withPresences: true});
                } catch (e) {
                    await msg.channel.send('Invalid member! Either the user isn\'t in the server or invalid id / mention.')
                    return;
                };
             }

            if (!msg.member.presence.activities || msg.member.presence.activities.length == 0) {
                await msg.channel.send(`${member} is not listening to Spotify!`);
            } 
            else {
                
                activities.forEach((activity) => {
                    if (activity.name === 'Spotify') {

                    }
                });
                const embed = new MessageEmbed()
                    .setAuthor({name: `${member.user.tag}'s Spotify Activity'`, iconURL: member.user.avatarURL()})
                    .setColor(hinaColor)
                    
            }
            await msg.channel.send(`${member} is not listening to Spotify!`);

            // TODO optimize and make it functional
        }
    }

];