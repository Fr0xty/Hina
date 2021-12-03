import discord
from discord.ext import commands

class UwU(commands.Cog):

  def __init__(self, client):
    self.client = client









  #declare prefix
  commands = commands.Bot(command_prefix = '(')



  @commands.command()
  async def updateuwurules(self, ctx):
    
    if ctx.author.id != 395587171601350676:
      await ctx.reply("You don't have permission to use this command!")
      return


    embed = discord.Embed(
      title = "Server Norms / Rules <:shrug:907780696460890142>",
      description = """
**1.** General chat is <#848530088021590037> and general commands in <#873844031048785960>
\u2800
\u2800
**2.** Chats on topics can be found in <#744786416327721051> category
\u2800
\u2800
**3.** Different bot commands are in <#801660898854043659> category
\u2800
\u2800
**4.** <#822362311645724704> <#914857640801218571> are following channels
\u2800
\u2800
**5.** You can swear all you want
\u2800
\u2800
**6.** <#801984078282620948> is the only NSFW channel in server, although we only use the channel when we're restricted by bots or discord. 
\u2800
\u2800
**7.** If you're a fellow prisoner you can get all the info at the category <#801659904606601267>
\u2800
\u2800
**8.** Announcements and shit are at category <#808657875392004126>
\u2800
\u2800
**9.** <#852869912682692618> is public for anyone to use and host, everyone can moderate so have fun.
\u2800
\u2800
**10.** DONT SIMPLY @everyone, anyone spamming @everyone will get MUTED FOR THE APPROPRIATE AMOUNT OF TIME. 
\u2800
\u2800
**11.** just have fun and chill

Note: *the server has special roles for things like games, hobbies and shit so you can ping that role instead.*
\u2800
\u2800
\u2800
__This is a small server and we want to give people freedom, but please be responsible and don't break our trust. Thank you.__ <a:HoloPout:885845964466839563>""",
      color = 16697537
    )
    channel = self.client.get_channel(823514167247372288)
    msg = await channel.fetch_message(897809144550146118)
    await msg.edit(embed = embed)




  @commands.command()
  async def updateuwugmlinks(self, ctx):
    
    if ctx.author.id != 395587171601350676:
      await ctx.reply("You don't have permission to use this command!")
      return


    embed = discord.Embed(
      title = "MBS Google Meet Links <:aquaCry:885845963502153759>\n",
      description = """
[4SN1 & Addtional Math](https://meet.google.com/sso-fgne-tzp)

[4SN2](https://meet.google.com/pcy-vcko-ani)

[English (Chuah)](https://meet.google.com/ump-skwa-gvy)

[Sejarah (Lam)](https://meet.google.com/cad-aqgg-ohg)

[Computer Science](https://meet.google.com/ome-rwvs-cxo)

[BC](https://meet.google.com/bih-hzwh-ygx)

[Moral (Wong)](https://meet.google.com/ezt-aybw-gwg)
""",
      color = 16768979
    )
    embed.set_author(name="Classes",icon_url=self.client.user.avatar_url)
    embed.set_footer(text="Note: online classes will stop on 22 Oct 2021")

    channel = self.client.get_channel(852870263019536394)
    msg = await channel.fetch_message(895138694296649730)
    await msg.edit(embed = embed)









def setup(client):
  client.add_cog(UwU(client))