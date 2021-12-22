import itertools
import discord

chars = "hina "
prefixList = list(map(''.join, itertools.product(*zip(chars.upper(), chars.lower()))))

hina_color = 14982399




def convert_seconds(seconds):
  seconds = seconds % (24 * 3600)
  hour = seconds // 3600
  seconds %= 3600
  minutes = seconds // 60
  seconds %= 60
  if hour:
    return "%dh %02dm %02ds" % (hour, minutes, seconds)
  elif minutes:
    return "%02dm %02ds" % (minutes, seconds)
  else:
    return "%02ds" % (seconds)
    



class helpEmbed():
    def __init__(self, client):
      pass

    def main(client, ctx):
      embed = discord.Embed( #embed help main page
        title = "Command Categories",
        description = "My commands are categorized for simpler searching and understanding. \n\n My prefix is `hina` \n ```<> = Required, [] = Optional.```",
        colour = hina_color
      )
      embed.set_author(name = f"{client.user.name} help command!", icon_url = client.user.avatar_url)
      embed.add_field(name = "<:Blush:900570132210929715> Behavioral", value = "`hina help behavoiral`", inline = True)
      embed.add_field(name = "<a:GuraFlap:885845968120066070> General", value = "`hina help general`", inline = True)
      embed.add_field(name = "<a:CATDANCE:885845964835926047> Fun", value = "`hina help fun`", inline = True)
      embed.add_field(name = "<a:dekuHYPE:885845965469253632> Emoji", value = "`hina help emoji`", inline = True)
      embed.add_field(name = "🎵 Music", value = "`hina help music`", inline = True)
      embed.add_field(name = "<:TGGasm:895182438064590879> Image", value = "`hina help image`", inline = True)
      embed.add_field(name = "🎌 Japanese", value = "`hina help japanese`", inline = True)
      embed.add_field(name = "🛠️ Utility", value = "`hina help utility`", inline = True)
      embed.add_field(name = "🎲 Games", value = "`hina help games`", inline = True)
      embed.set_footer(text=f"{ctx.author} requested", icon_url=ctx.author.avatar_url)
      return embed



    def behavioral(client):
      embed = discord.Embed( #Bahavioral Category
        colour = hina_color
      )
      embed.set_author(name = f"{client.user.name} Behavoiral Category", icon_url = client.user.avatar_url)
      embed.add_field(name = "Greetings", value = "If you use any of the following greetings, I will greet you back! \n `hello`, `hi`, `yo`, `sup`, `wassup`, `yahhallo`, `nyahhallo`, `こんにちは`, `おはよう`, `こんばんは`, `ハロー`, `おっす`, `にゃっはろー`, `やっはろー`, `にゃんぱすー` \n\u2800", inline = True)
      embed.set_footer(text="<> = Required, [] = Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")
      return embed



    def general(client):
      embed = discord.Embed( #General Category
        colour = hina_color
      )
      embed.set_author(name = f"{client.user.name} General Category", icon_url = client.user.avatar_url)
      embed.add_field(name = "`help [category]`", value = "get this help embed \n\u2800", inline = True)
      embed.add_field(name = "`invite`", value = "get my invite link \n\u2800", inline = True)
      embed.add_field(name = "`translate <language> <text / reply to msg>`", value = "translate message or your text \n\u2800", inline = True)
      embed.add_field(name = "`spotify [@user]`", value = "get user spotify listening infos \n\u2800", inline = True)
      embed.set_footer(text="<> = Required, [] = Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")
      return embed
    


    def fun(client):
      embed = discord.Embed( #Fun Category
        colour = hina_color
      )
      embed.set_author(name = f"{client.user.name} Fun Category", icon_url = client.user.avatar_url)
      embed.add_field(name = "`funfact`", value = "Get a fun fact! \n\u2800", inline = True)
      embed.add_field(name = "`joke`", value = "Allow me to tell you a joke! \n\u2800", inline = True)
      embed.add_field(name = "`act <@user> <msg>`", value = "I will impersonate the user to say things. \n\u2800", inline = True)
      embed.set_footer(text="<> = Required, [] = Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")
      return embed



    def emoji(client):
      embed = discord.Embed( #Emoji Category
        title = "Use the nitro emoji perks!",
        colour = hina_color
      )
      embed.set_author(name = f"{client.user.name} Emoji Category", icon_url = client.user.avatar_url)
      embed.set_thumbnail(url="https://cdn.discordapp.com/attachments/879574005860945930/884294956649414716/nitro_perk.png")
      embed.add_field(name = ";<emoji_name>;", value = "__only for native server emoji__ \n\n *Example:*\n name of emoji-  `nom` \n use-  `;nom;` \n\n \u2800")
      embed.add_field(name = "`getemoji [server_id]`", value = "get all server emoji(s) \n\n \u2800", inline = False)
      embed.add_field(name = "`usemoji <emoji_id>`", value = "send the emoji as you! \n\n \u2800", inline = False)
      embed.add_field(name = "`reactemoji <emoji_id>`", value = "react to message with the emoji \n __reply to the message while using the command__ \n\n \u2800", inline = False)
      embed.set_footer(text="<> = Required, [] = Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")
      return embed



    def music(client):
      embed = discord.Embed( #Music Category
        colour = hina_color
      )
      embed.set_author(name = f"{client.user.name} Music Category", icon_url = client.user.avatar_url)
      embed.add_field(name = "`join`, `leave`", value = "I'll join and leave the channel \n\u2800", inline = True)
      embed.add_field(name = "`play <YT_url>`", value = "Add music to the queue \n\u2800", inline = True)
      embed.add_field(name = "`pause`, `resume`", value = "Pause the music whenever! \n\u2800", inline = True)
      embed.add_field(name = "`np`", value = "Short for 'now playing', shows the current music and time track \n\u2800", inline = True)
      embed.add_field(name = "`queue`, `q`", value = "Display the music queue \n\u2800", inline = True)
      embed.add_field(name = "`skip`", value = "Skip current music \n\u2800", inline = True)
      embed.add_field(name = "`stop`", value = "Stop playing music \n\u2800", inline = True)
      embed.add_field(name = "`clear`", value = "Clear music queue \n\u2800", inline = True)
      embed.set_footer(text="<> = Required, [] = Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")
      return embed

      

    def image(client):
      embed = discord.Embed( #Image Category
        title = "Get images with the following tags.",
        description = "The API used: https://waifu.im/ \n\u2800\n **Note:**\n`<tag> [amount]` \n This can be applied to every command in this category \n\u2800",
        colour = hina_color
      )
      embed.set_author(name = f"{client.user.name} Image Category", icon_url = client.user.avatar_url)
      embed.add_field(name="SFW:", value="`waifu`, `maid`")
      embed.add_field(name="NSFW:", value="`ass`, `ecchi`, `ero`, `hentai`, `nsfwmaid`, `milf`, `oppai`, `oral`, `paizuri`, `selfies`, `uniform` \n\u2800", inline=False)
      embed.add_field(name="Wildcard!", value="`random`", inline=False)
      embed.set_footer(text="<> = Required, [] = Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")
      return embed

      

    def japanese(client):
      embed = discord.Embed( #Japanese Category
        title = "Japanese Learning Commands",
        description = "Provides cheat sheets, quizes and more!",
        colour = hina_color
      )
      embed.set_author(name = f"{client.user.name} Japanese Category", icon_url = client.user.avatar_url)
      embed.add_field(name = "`teform`", value = "Start a teform quiz \n\u2800", inline = True)
      embed.add_field(name = "`quiz_stop`", value = "Stop the current quiz \n\u2800", inline = False)
      embed.add_field(name = "`info <quiz_name>`", value = "Get a cheat sheet / explanation of the topic \n\u2800", inline = False)
      embed.set_footer(text="<> = Required, [] = Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")
      return embed



    def utility(client):
      embed = discord.Embed( #Utility Category
        colour = hina_color
      )
      embed.set_author(name = f"{client.user.name} Utility Category", icon_url = client.user.avatar_url)
      embed.add_field(name = "`avatar [@user]`", value = "get user avatar, without [@user] will return your own avatar \n\u2800", inline = True)
      embed.add_field(name = "`idavatar [user_id]`", value = "same with `avatar` but take in user_id instead \n\u2800", inline = False)
      embed.add_field(name = "`userinfo [@user]`", value = "get all info about the user \n\u2800", inline = False)
      embed.add_field(name = "`googlesearch <search_keyword>`\n `gs <search_keyword>`", value = "google search something \n\u2800", inline = False),
      embed.add_field(name = "`advancegooglesearch <region> <language> <search_keyword>`\n `adgs <region> <language> <search_keyword>`", value = "same with `gs` but you can choose region and language \n\u2800", inline = False),
      embed.add_field(name = "`prune [amount]`", value = "delete an amount of messages in channel, require *manage_messages* permission \n\u2800", inline = False),
      embed.add_field(name = "`epochtime`", value = "get brief doc for epochtime \n\u2800", inline = False)
      embed.add_field(name = "`ping`", value = "get ping time \n\u2800", inline = False)
      embed.set_footer(text="<> = Required, [] = Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")
      return embed

      

    def games(client):
      embed = discord.Embed( #UwU Category
        title = "UwU Discord Server Commands",
        colour = hina_color
      )
      embed.set_author(name = f"{client.user.name} Games Category", icon_url = client.user.avatar_url)
      embed.add_field(name = "Currently in progress", value = "\n\u2800", inline = True)
      embed.set_footer(text="<> = Required, [] = Optional", icon_url="https://cdn.discordapp.com/attachments/907586559719645204/913010359936372746/amasiro_natuki.png")
      return embed



    def creator(client, owner):
      embed = discord.Embed(  #Creator Category
        title = "Creator Only Commands",
        colour = 7602079
      )
      embed.set_author(name = f"{client.user.name} Creator Category", icon_url = client.user.avatar_url)
      embed.add_field(name = "<a:UwU:907573738369875998> `updateuwurules`", value = "Update UwU server rules embed \n\u2800", inline = True)
      embed.add_field(name = "<a:Menacing:885845967029551124> `rename <name>`", value = "Renames bot name \n\u2800", inline = True)
      embed.add_field(name = "📜 `cl` *****", value = "Get checklist \n\u2800", inline = True)
      embed.add_field(name = "📜 `cladd <songname>, <url>`", value = "Add to checklist \n\u2800", inline = True)
      embed.add_field(name = "📜 `clremove <num>`", value = "Remove from checklist \n\u2800", inline = True)
      embed.add_field(name = "🎌 `tfadd <dict_form> <te_form> <ctype>`", value = "Add word to teform.json \n\u2800", inline = True)
      embed.add_field(name = "🎌 `tfread <list_index>` *****", value = "get word(dict) from teform.json \n\u2800", inline = True)
      embed.add_field(name = "🎌 `tftype` *****", value = "get len() of every conjugate type (ctype) \n\u2800", inline = True)
      embed.set_footer(text="Commands with * are not restricted to only creator. \n > = Required, [] = Optional", icon_url=owner.avatar_url)
      return embed