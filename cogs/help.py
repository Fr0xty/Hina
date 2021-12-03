import discord
from discord.ext import commands
from discord_components import *
import asyncio







class help(commands.Cog):

  def __init__(self, client):
    self.client = client

    self.main_page_button = Button(label="Main Page", style=ButtonStyle.blue)
    self.delete_button = Button(label="Delete", style=ButtonStyle.red)





  @commands.Cog.listener()
  async def on_select_option(self, interaction):

    owner = await self.client.fetch_user(395587171601350676)
    owner_pfp = owner.avatar_url

    helpEmbedBehavioral = discord.Embed( #Bahavioral Category
      colour = 14982399
    )
    helpEmbedBehavioral.set_author(name = f"{self.client.user.name} Behavoiral Category <a:HoloPout:885845964466839563>", icon_url = self.client.user.avatar_url)
    helpEmbedBehavioral.add_field(name = "Greetings", value = "If you use any of the following greetings, I will greet you back! \n `hello`, `hi`, `yo`, `sup`, `wassup`, `yahhallo`, `nyahhallo`, `こんにちは`, `おはよう`, `こんばんは`, `ハロー`, `おっす`, `にゃっはろー`, `やっはろー`, `にゃんぱすー` \n\u2800", inline = True)
    helpEmbedBehavioral.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")


    helpEmbedGeneral = discord.Embed( #General Category
      colour = 14982399
    )
    helpEmbedGeneral.set_author(name = f"{self.client.user.name} General Category", icon_url = self.client.user.avatar_url)
    helpEmbedGeneral.add_field(name = "`(help`", value = "get this help embed \n\u2800", inline = True)
    helpEmbedGeneral.add_field(name = "`(invite`", value = "get my invite link \n\u2800", inline = True)
    helpEmbedGeneral.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedFun = discord.Embed( #Fun Category
      colour = 14982399
    )
    helpEmbedFun.set_author(name = f"{self.client.user.name} Fun Category", icon_url = self.client.user.avatar_url)
    helpEmbedFun.add_field(name = "`(funfact`", value = "Get a fun fact! \n\u2800", inline = True)
    helpEmbedFun.add_field(name = "`(joke`", value = "Allow me to tell you a joke! \n\u2800", inline = True)
    helpEmbedFun.add_field(name = "`(act <@user> <msg>`", value = "I will impersonate the user to say things. \n\u2800", inline = True)
    helpEmbedFun.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")

    helpEmbedEmoji = discord.Embed( #Emoji Category
      title = "Use the nitro emoji perks!",
      colour = 14982399
    )
    helpEmbedEmoji.set_author(name = f"{self.client.user.name} Emoji Category", icon_url = self.client.user.avatar_url)
    helpEmbedEmoji.set_thumbnail(url="https://cdn.discordapp.com/attachments/879574005860945930/884294956649414716/nitro_perk.png")
    helpEmbedEmoji.add_field(name = "__For native emoji in the server__", value = "`;<emoji_name>;` \n\n *Example:*\n name of emoji-  `nom` \n use-  `;nom;` \n\n \u2800", inline = True)
    helpEmbedEmoji.add_field(name = "__For emoji outside of the server__", value = "You need the full emoji id first!", inline = False)
    helpEmbedEmoji.add_field(name = "1 How to get the emoji id?", value = "If I'm in the emoji hosting server: \n `(getemoji [server_id]` \n\n *without giving [server_id] will return the current server's emoji* \n\n else: \n Use the emoji in that server with `\` in front of it \n\u2800\n Result: `<a:hyperYAY:885845967419633704>` \n\u2800", inline = False)
    helpEmbedEmoji.add_field(name = "2 Using the emoji", value = "Use this command, and make sure to remove the angle brackets from the id \n `(usemoji <the_emoji_id>`", inline = False)
    helpEmbedEmoji.add_field(name = "3 Reacting", value = "Using the same emoji id without the brackets! \n `(reactemoji <msg_id> <the_emoji_id>`", inline = False)
    helpEmbedEmoji.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedMusic = discord.Embed( #Music Category
      colour = 14982399
    )
    helpEmbedMusic.set_author(name = f"{self.client.user.name} Music Category", icon_url = self.client.user.avatar_url)
    helpEmbedMusic.add_field(name = "`(join`, `(leave`", value = "I'll join and leave the channel \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(play <YT_url>`", value = "Add music to the queue \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(pause`, `(resume`", value = "Pause the music whenever! \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(np`", value = "Short for 'now playing', shows the current music and time track \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(queue`, `(q`", value = "Display the music queue \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(skip`", value = "Skip current music \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(stop`", value = "Stop playing music \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(clear`", value = "Clear music queue \n\u2800", inline = True)
    helpEmbedMusic.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedImage = discord.Embed( #Image Category
      title = "Get images with the following tags.",
      description = "The API used: https://waifu.im/ \n\u2800\n **Note:**\n`(tag [amount]` \n This can be applied to every command in this category \n\u2800",
      colour = 14982399
    )
    helpEmbedImage.set_author(name = f"{self.client.user.name} Image Category", icon_url = self.client.user.avatar_url)
    helpEmbedImage.add_field(name="SFW:", value="`(waifu`, `(maid`")
    helpEmbedImage.add_field(name="NSFW:", value="`(ass`, `(ecchi`, `(ero`, `(hentai`, `(nsfwmaid`, `(milf`, `(oppai`, `(oral`, `(paizuri`, `(selfies`, `(uniform` \n\u2800", inline=False)
    helpEmbedImage.add_field(name="Wildcard!", value="`(random`", inline=False)
    helpEmbedImage.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedJP = discord.Embed( #Japanese Category
      title = "Japanese Learning Commands",
      description = "Provides cheat sheets, quizes and more!",
      colour = 14982399
    )
    helpEmbedJP.set_author(name = f"{self.client.user.name} Japanese Category", icon_url = self.client.user.avatar_url)
    helpEmbedJP.add_field(name = "`(teform`", value = "Start a teform quiz \n\u2800", inline = True)
    helpEmbedJP.add_field(name = "`(quiz_stop`", value = "Stop the current quiz \n\u2800", inline = False)
    helpEmbedJP.add_field(name = "`(info <quiz_name>`", value = "Get a cheat sheet / explanation of the topic \n\u2800", inline = False)
    helpEmbedJP.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedUtility = discord.Embed( #Utility Category
      colour = 14982399
    )
    helpEmbedUtility.set_author(name = f"{self.client.user.name} Utility Category", icon_url = self.client.user.avatar_url)
    helpEmbedUtility.add_field(name = "`(avatar [@user]`", value = "get user avatar, without [@user] will return your own avatar \n\u2800", inline = True)
    helpEmbedUtility.add_field(name = "`(idavatar [user_id]`", value = "same with `(avatar` but take in user_id instead \n\u2800", inline = False)
    helpEmbedUtility.add_field(name = "`(userinfo [@user]`", value = "get all info about the user \n\u2800", inline = False)
    helpEmbedUtility.add_field(name = "`(googlesearch <search_keyword>`\n `(gs <search_keyword>`", value = "google search something \n\u2800", inline = False),
    helpEmbedUtility.add_field(name = "`(advancegooglesearch <region> <language> <search_keyword>`\n `(adgs <region> <language> <search_keyword>`", value = "same with `gs` but you can choose region and language \n\u2800", inline = False),
    helpEmbedUtility.add_field(name = "`(prune [amount]`", value = "delete an amount of messages in channel, require *manage_messages* permission \n\u2800", inline = False),
    helpEmbedUtility.add_field(name = "`(epochtime`", value = "get brief doc for epochtime \n\u2800", inline = False)
    helpEmbedUtility.add_field(name = "`(ping`", value = "get ping time \n\u2800", inline = False)
    helpEmbedUtility.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedUwU = discord.Embed( #UwU Category
      title = "UwU Discord Server Commands",
      colour = 14982399
    )
    helpEmbedUwU.set_author(name = f"{self.client.user.name} UwU Category", icon_url = self.client.user.avatar_url)
    helpEmbedUwU.add_field(name = "Currently this category is __deprecated__", value = "But more commands are coming in the future \n\u2800", inline = True)
    helpEmbedUwU.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")




    helpEmbedHidden = discord.Embed(  #Creator Category
      title = "Creator Only Commands",
      colour = 7602079
    )
    helpEmbedHidden.set_author(name = f"{self.client.user.name} Creator Category", icon_url = self.client.user.avatar_url)
    helpEmbedHidden.add_field(name = "<a:UwU:907573738369875998> `(updateuwurules`", value = "Update UwU server rules embed \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "<a:UwU:907573738369875998> `(updateuwugmlinks`", value = "Update UwU server GM embed \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "<a:Menacing:885845967029551124> `(rename`", value = "Renames bot name \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "📜 `(cl` *****", value = "Get checklist \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "📜 `(cladd <songname>, <url>`", value = "Add to checklist \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "📜 `(clremove <num>`", value = "Remove from checklist \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "🎌 `(tfadd <dict_form> <te_form> <ctype>`", value = "Add word to teform.json \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "🎌 `(tfread <list_index>` *****", value = "get word(dict) from teform.json \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "🎌 `(tftype` *****", value = "get len() of every conjugate type (ctype) \n\u2800", inline = True)
    helpEmbedHidden.set_footer(text="Commands with * are not restricted to only creator. \n <args> are Required | [args] are Optional", icon_url=owner_pfp)


    if interaction.values[0] == "behavior":
      await interaction.message.edit(embed = helpEmbedBehavioral)
      await interaction.respond()

    if interaction.values[0] == "gen":
      await interaction.message.edit(embed = helpEmbedGeneral)
      await interaction.respond()

    if interaction.values[0] == "fun":
      await interaction.message.edit(embed = helpEmbedFun)
      await interaction.respond()

    if interaction.values[0] == "emoji":
      await interaction.message.edit(embed = helpEmbedEmoji)
      await interaction.respond()
    
    if interaction.values[0] == "music":
      await interaction.message.edit(embed = helpEmbedMusic)
      await interaction.respond()

    if interaction.values[0] == "image":
      await interaction.message.edit(embed = helpEmbedImage)
      await interaction.respond()

    if interaction.values[0] == "jp":
      await interaction.message.edit(embed = helpEmbedJP)
      await interaction.respond()

    if interaction.values[0] == "util":
      await interaction.message.edit(embed = helpEmbedUtility)
      await interaction.respond()

    if interaction.values[0] == "uwu":
      await interaction.message.edit(embed = helpEmbedUwU)
      await interaction.respond()

    if interaction.values[0] == "hidden":
      await interaction.message.edit(embed = helpEmbedHidden)
      await interaction.respond()
























  #declare prefix
  commands = commands.Bot(command_prefix = '(')
  commands.remove_command('help')                 #remove default built-in help command







  @commands.command()
  async def help(self, ctx, category=None):

    owner = await self.client.fetch_user(395587171601350676)
    owner_pfp = owner.avatar_url

    helpEmbedBehavioral = discord.Embed( #Bahavioral Category
      colour = 14982399
    )
    helpEmbedBehavioral.set_author(name = f"{self.client.user.name} Behavoiral Category <a:HoloPout:885845964466839563>", icon_url = self.client.user.avatar_url)
    helpEmbedBehavioral.add_field(name = "Greetings", value = "If you use any of the following greetings, I will greet you back! \n `hello`, `hi`, `yo`, `sup`, `wassup`, `yahhallo`, `nyahhallo`, `こんにちは`, `おはよう`, `こんばんは`, `ハロー`, `おっす`, `にゃっはろー`, `やっはろー`, `にゃんぱすー` \n\u2800", inline = True)
    helpEmbedBehavioral.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")


    helpEmbedGeneral = discord.Embed( #General Category
      colour = 14982399
    )
    helpEmbedGeneral.set_author(name = f"{self.client.user.name} General Category", icon_url = self.client.user.avatar_url)
    helpEmbedGeneral.add_field(name = "`(help`", value = "get this help embed \n\u2800", inline = True)
    helpEmbedGeneral.add_field(name = "`(invite`", value = "get my invite link \n\u2800", inline = True)
    helpEmbedGeneral.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedFun = discord.Embed( #Fun Category
      colour = 14982399
    )
    helpEmbedFun.set_author(name = f"{self.client.user.name} Fun Category", icon_url = self.client.user.avatar_url)
    helpEmbedFun.add_field(name = "`(funfact`", value = "Get a fun fact! \n\u2800", inline = True)
    helpEmbedFun.add_field(name = "`(joke`", value = "Allow me to tell you a joke! \n\u2800", inline = True)
    helpEmbedFun.add_field(name = "`(act <@user> <msg>`", value = "I will impersonate the user to say things. \n\u2800", inline = True)
    helpEmbedFun.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")

    helpEmbedEmoji = discord.Embed( #Emoji Category
      title = "Use the nitro emoji perks!",
      colour = 14982399
    )
    helpEmbedEmoji.set_author(name = f"{self.client.user.name} Emoji Category", icon_url = self.client.user.avatar_url)
    helpEmbedEmoji.set_thumbnail(url="https://cdn.discordapp.com/attachments/879574005860945930/884294956649414716/nitro_perk.png")
    helpEmbedEmoji.add_field(name = "__For native emoji in the server__", value = "`;<emoji_name>;` \n\n *Example:*\n name of emoji-  `nom` \n use-  `;nom;` \n\n \u2800", inline = True)
    helpEmbedEmoji.add_field(name = "__For emoji outside of the server__", value = "You need the full emoji id first!", inline = False)
    helpEmbedEmoji.add_field(name = "1 How to get the emoji id?", value = "If I'm in the emoji hosting server: \n `(getemoji [server_id]` \n\n *without giving [server_id] will return the current server's emoji* \n\n else: \n Use the emoji in that server with `\` in front of it \n\u2800\n Result: `<a:hyperYAY:885845967419633704>` \n\u2800", inline = False)
    helpEmbedEmoji.add_field(name = "2 Using the emoji", value = "Use this command, and make sure to remove the angle brackets from the id \n `(usemoji <the_emoji_id>`", inline = False)
    helpEmbedEmoji.add_field(name = "3 Reacting", value = "Using the same emoji id without the brackets! \n `(reactemoji <msg_id> <the_emoji_id>`", inline = False)
    helpEmbedEmoji.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedMusic = discord.Embed( #Music Category
      colour = 14982399
    )
    helpEmbedMusic.set_author(name = f"{self.client.user.name} Music Category", icon_url = self.client.user.avatar_url)
    helpEmbedMusic.add_field(name = "`(join`, `(leave`", value = "I'll join and leave the channel \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(play <YT_url>`", value = "Add music to the queue \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(pause`, `(resume`", value = "Pause the music whenever! \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(np`", value = "Short for 'now playing', shows the current music and time track \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(queue`, `(q`", value = "Display the music queue \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(skip`", value = "Skip current music \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(stop`", value = "Stop playing music \n\u2800", inline = True)
    helpEmbedMusic.add_field(name = "`(clear`", value = "Clear music queue \n\u2800", inline = True)
    helpEmbedMusic.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedImage = discord.Embed( #Image Category
      title = "Get images with the following tags.",
      description = "The API used: https://waifu.im/ \n\u2800\n **Note:**\n`(tag [amount]` \n This can be applied to every command in this category \n\u2800",
      colour = 14982399
    )
    helpEmbedImage.set_author(name = f"{self.client.user.name} Image Category", icon_url = self.client.user.avatar_url)
    helpEmbedImage.add_field(name="SFW:", value="`(waifu`, `(maid`")
    helpEmbedImage.add_field(name="NSFW:", value="`(ass`, `(ecchi`, `(ero`, `(hentai`, `(nsfwmaid`, `(milf`, `(oppai`, `(oral`, `(paizuri`, `(selfies`, `(uniform` \n\u2800", inline=False)
    helpEmbedImage.add_field(name="Wildcard!", value="`(random`", inline=False)
    helpEmbedImage.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedJP = discord.Embed( #Japanese Category
      title = "Japanese Learning Commands",
      description = "Provides cheat sheets, quizes and more!",
      colour = 14982399
    )
    helpEmbedJP.set_author(name = f"{self.client.user.name} Japanese Category", icon_url = self.client.user.avatar_url)
    helpEmbedJP.add_field(name = "`(teform`", value = "Start a teform quiz \n\u2800", inline = True)
    helpEmbedJP.add_field(name = "`(quiz_stop`", value = "Stop the current quiz \n\u2800", inline = False)
    helpEmbedJP.add_field(name = "`(info <quiz_name>`", value = "Get a cheat sheet / explanation of the topic \n\u2800", inline = False)
    helpEmbedJP.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedUtility = discord.Embed( #Utility Category
      colour = 14982399
    )
    helpEmbedUtility.set_author(name = f"{self.client.user.name} Utility Category", icon_url = self.client.user.avatar_url)
    helpEmbedUtility.add_field(name = "`(avatar [@user]`", value = "get user avatar, without [@user] will return your own avatar \n\u2800", inline = True)
    helpEmbedUtility.add_field(name = "`(idavatar [user_id]`", value = "same with `(avatar` but take in user_id instead \n\u2800", inline = False)
    helpEmbedUtility.add_field(name = "`(userinfo [@user]`", value = "get all info about the user \n\u2800", inline = False)
    helpEmbedUtility.add_field(name = "`(googlesearch <search_keyword>`\n `(gs <search_keyword>`", value = "google search something \n\u2800", inline = False),
    helpEmbedUtility.add_field(name = "`(advancegooglesearch <region> <language> <search_keyword>`\n `(adgs <region> <language> <search_keyword>`", value = "same with `gs` but you can choose region and language \n\u2800", inline = False),
    helpEmbedUtility.add_field(name = "`(prune [amount]`", value = "delete an amount of messages in channel, require *manage_messages* permission \n\u2800", inline = False),
    helpEmbedUtility.add_field(name = "`(epochtime`", value = "get brief doc for epochtime \n\u2800", inline = False)
    helpEmbedUtility.add_field(name = "`(ping`", value = "get ping time \n\u2800", inline = False)
    helpEmbedUtility.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")



    helpEmbedUwU = discord.Embed( #UwU Category
      title = "UwU Discord Server Commands",
      colour = 14982399
    )
    helpEmbedUwU.set_author(name = f"{self.client.user.name} UwU Category", icon_url = self.client.user.avatar_url)
    helpEmbedUwU.add_field(name = "Currently this category is __deprecated__", value = "But more commands are coming in the future \n\u2800", inline = True)
    helpEmbedUwU.set_footer(text="<args> are Required | [args] are Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")




    helpEmbedHidden = discord.Embed(  #Creator Category
      title = "Creator Only Commands",
      colour = 7602079
    )
    helpEmbedHidden.set_author(name = f"{self.client.user.name} Creator Category", icon_url = self.client.user.avatar_url)
    helpEmbedHidden.add_field(name = "<a:UwU:907573738369875998> `(updateuwurules`", value = "Update UwU server rules embed \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "<a:UwU:907573738369875998> `(updateuwugmlinks`", value = "Update UwU server GM embed \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "<a:Menacing:885845967029551124> `(rename`", value = "Renames bot name \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "📜 `(cl` *****", value = "Get checklist \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "📜 `(cladd <songname>, <url>`", value = "Add to checklist \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "📜 `(clremove <num>`", value = "Remove from checklist \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "🎌 `(tfadd <dict_form> <te_form> <ctype>`", value = "Add word to teform.json \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "🎌 `(tfread <list_index>` *****", value = "get word(dict) from teform.json \n\u2800", inline = True)
    helpEmbedHidden.add_field(name = "🎌 `(tftype` *****", value = "get len() of every conjugate type (ctype) \n\u2800", inline = True)
    helpEmbedHidden.set_footer(text="Commands with * are not restricted to only creator. \n <args> are Required | [args] are Optional", icon_url=owner_pfp)

#--------------------------------------------------------------------------------------
    if category is not None:

      if category.lower() == "behavioral":
        await ctx.send(embed=helpEmbedBehavioral)
        return
      elif category.lower() == "general":
        await ctx.send(embed=helpEmbedGeneral)
        return
      elif category.lower() == "fun":
        await ctx.send(embed=helpEmbedFun)
        return
      elif category.lower() == "emoji":
        await ctx.send(embed=helpEmbedEmoji)
        return
      elif category.lower() == "music":
        await ctx.send(embed=helpEmbedFun)
        return
      elif category.lower() == "image":
        await ctx.send(embed=helpEmbedImage)
        return
      elif category.lower() == "japanese":
        await ctx.send(embed=helpEmbedJP)
        return
      elif category.lower() == "utility":
        await ctx.send(embed=helpEmbedUtility)
        return
      elif category.lower() == "uwu":
        await ctx.send(embed=helpEmbedUwU)
        return
      elif category.lower() == "creator":
        await ctx.send(embed=helpEmbedHidden)
        return
      else:
        await ctx.send(f"There is no category named: {category}")
        return


    helpEmbedMainPG = discord.Embed( #embed help main page
      title = "Command Categories",
      description = "My commands are categorized for simpler searching and understanding. \n\n My prefix is `(` \n ```[args] are optional, <args> are required.```",
      colour = 14982399
    )
    helpEmbedMainPG.set_author(name = f"{self.client.user.name} help command!", icon_url = self.client.user.avatar_url)
    helpEmbedMainPG.add_field(name = "<:Blush:900570132210929715> Behavioral", value = "`(help behavoiral`", inline = True)
    helpEmbedMainPG.add_field(name = "<a:GuraFlap:885845968120066070> General", value = "`(help general`", inline = True)
    helpEmbedMainPG.add_field(name = "<a:CATDANCE:885845964835926047> Fun", value = "`(help fun`", inline = True)
    helpEmbedMainPG.add_field(name = "<a:dekuHYPE:885845965469253632> Emoji", value = "`(help emoji`", inline = True)
    helpEmbedMainPG.add_field(name = "🎵 Music", value = "`(help music`", inline = True)
    helpEmbedMainPG.add_field(name = "<:TGGasm:895182438064590879> Image", value = "`(help image`", inline = True)
    helpEmbedMainPG.add_field(name = "🎌 Japanese", value = "`(help japanese`", inline = True)
    helpEmbedMainPG.add_field(name = "🛠️ Utility", value = "`(help utility`", inline = True)
    helpEmbedMainPG.add_field(name = "<a:UwU:907573738369875998> UwU", value = "`(help uwu`", inline = True)
    helpEmbedMainPG.set_footer(text=f"{ctx.author} requested", icon_url=ctx.author.avatar_url)


    normal_component = [
      Select(
        placeholder = 'Select Your Category!',
        options = [
          SelectOption(label="Behavoiral", value="behavior", emoji = self.client.get_emoji(900570132210929715), description="I'm a human too ok, baka!"),
          SelectOption(label="General", value="gen", emoji = self.client.get_emoji(885845968120066070), description="Basic or common commands"),
          SelectOption(label="Fun", value="fun" , emoji=self.client.get_emoji(885845964835926047), description="Some fun commmands to mess with."),
          SelectOption(label="Emoji", value="emoji", emoji=self.client.get_emoji(885845965469253632), description="Free nitro perks for emoji."),
          SelectOption(label="Music", value="music", emoji="🎵", description="Music commands."),
          SelectOption(label="Image", value="image", emoji=self.client.get_emoji(895182438064590879), description="Get all those waifu and hentai pics baby!"),
          SelectOption(label="Japanese", value="jp", emoji="🎌", description="Japanese learning quizes and games!"),
          SelectOption(label="Utility", value="util", emoji="🛠️", description="Useful technical commands"),
          SelectOption(label="UwU", value="uwu", emoji=self.client.get_emoji(907573738369875998), description="UwU server commands.")
          ]
        ),
        [self.main_page_button, self.delete_button],
        [Button(label="Invite Me!", style=5, url="https://discord.com/api/oauth2/authorize?client_id=769125937731338290&permissions=8&scope=bot", emoji = self.client.get_emoji(884003530933944341)),
        Button(label="Join UwU Server", style=5, url="https://discord.gg/VtQRrVCxg8", emoji=self.client.get_emoji(907573738369875998)),
        Button(label="Github Repo", style=5, url="https://github.com/Fr0xty/hinamaru", emoji=self.client.get_emoji(913019791743262772))]
    ]

    owner_component = [
      Select(
        placeholder = 'Select Your Category!',
        options = [
          SelectOption(label="Behavoiral", value="behavior", emoji = self.client.get_emoji(900570132210929715), description="I'm a human too ok, baka!"),
          SelectOption(label="General", value="gen", emoji = self.client.get_emoji(885845968120066070), description="Basic or common commands"),
          SelectOption(label="Fun", value="fun" , emoji=self.client.get_emoji(885845964835926047), description="Some fun commmands to mess with."),
          SelectOption(label="Emoji", value="emoji", emoji=self.client.get_emoji(885845965469253632), description="Free nitro perks for emoji."),
          SelectOption(label="Music", value="music", emoji="🎵", description="Music commands."),
          SelectOption(label="Image", value="image", emoji=self.client.get_emoji(895182438064590879), description="Get all those waifu and hentai pics baby!"),
          SelectOption(label="Japanese", value="jp", emoji="🎌", description="Japanese learning quizes and games!"),
          SelectOption(label="Utility", value="util", emoji="🛠️", description="Useful technical commands"),
          SelectOption(label="UwU", value="uwu", emoji=self.client.get_emoji(907573738369875998), description="UwU server commands."),
          SelectOption(label="Creator", value="hidden", emoji=self.client.get_emoji(885845967029551124), description="Hidden Commands")
          ]
        ),
        [self.main_page_button, self.delete_button],
        [Button(label="Invite Me!", style=5, url="https://discord.com/api/oauth2/authorize?client_id=769125937731338290&permissions=8&scope=bot", emoji = self.client.get_emoji(884003530933944341)),
        Button(label="Join UwU Server", style=5, url="https://discord.gg/VtQRrVCxg8", emoji=self.client.get_emoji(907573738369875998)),
        Button(label="Github Repo", style=5, url="https://github.com/Fr0xty/hinamaru", emoji=self.client.get_emoji(913019791743262772))]
    ]



    if ctx.author.id == 395587171601350676:
      comp = owner_component
    else:
      comp = normal_component



      
    timedOut = False
    sent_help = await ctx.send(embed = helpEmbedMainPG, components = comp)
      
    

    while timedOut == False: 

      try:
        interaction = await self.client.wait_for("button_click", timeout = 180)
        req = interaction.component.label

        if req == "Main Page":
          await sent_help.edit(embed=helpEmbedMainPG)
          await interaction.respond()

        if req == "Delete":
          await sent_help.delete()
          return


      except asyncio.TimeoutError:
        await sent_help.edit("**Timedout.**", components=None)
        timedOut = True
        


















def setup(client):
  client.add_cog(help(client))