import { SlashCommandBuilder } from '@discordjs/builders';


export default {

    name: 'reactemoji',
    aliases: [],
    description: 'react to messages using the emoji.',





    async execute(Hina, msg, args) {

        if (!msg.reference) return await msg.reply('Please reply to the message you want to react to while using the command!');
        if (!args) return await msg.reply('Please provide the emoji id.');

        const theMsg = await msg.fetchReference();
        
        try { 
            await theMsg.react(args[0]);
            await msg.delete();
        }
        catch { await msg.reply(`Invalid emoji id: ${args[0]}`)};
    },





    slashCommandProfile: new SlashCommandBuilder()
        .setName('reactemoji')
        .setDescription('react any emoji (include animated) to a message.')
	    .addStringOption(option => 
            option
                .setName('message_id')
                .setDescription('the message id to react to, enable developer mode on discord to copy id.')
                .setRequired(true)
        )
	    .addStringOption(option => 
            option
                .setName('emoji_id')
                .setDescription('full emoji id without `<>`, can get using `getemoji` command.')
                .setRequired(true)
        ),




    async slashExecute(Hina, interaction) {

        // TODO fix
        return await interaction.reply('Command in progress.');
        
        const msgId = interaction.options.get('message_id');
        const emojiId = interaction.options.get('emoji_id');

        const fetchedMsgs = await interaction.channel.messages.fetch(msgId);
        if (!fetchedMsgs) return await interaction.reply('Invalid message id / not in this text channel.');
        
        try { 
            const msg = fetchedMsgs.first();
            await msg.react(emojiId);
            await interaction.reply({
                content: 'reacted to the message!',
                ephemeral: true,
            });
        }
        catch (err) { await interaction.reply(`Invalid emoji id: ${emojiId.value}`); console.log(err) };
    },
};