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
      title = "Basic Server Etiquette / Rules",
      description = """
**1.** Please only do waifu commands in <#816169629558112286>


**2.** General chat is <#848530088021590037> and commands that don't match any channels in <#873844031048785960>


**3.** Order your songs at <#821582013726326814>


**4.** ONLY CULTURED PICTURES in <#823513202579079218>, no chatting, text and any irrelevant things


**5.** You can swear all you want


**6.** <#801984078282620948> is the only NSFW channel in server, although we only use the channel when we're restricted by bots or discord. 


**7.** If you're a fellow prisoner you can get all the info at the category <#801659904606601267>


**8.** Boring stuff at category <#808657875392004126> and following announcement are at <#781167322794164225>, <#744850566894714902> and <#809513731595042885>, and free stuff to snipe are announced at <#822362311645724704>


**9.** <#852869912682692618> is public for anyone to use and host, everyone can moderate so have fun.


**10.** DON'T SEND ANY CLASSIFIED INFO OUT OF THIS GROUP OR ELSE YOU WILL RESULT IN A BAN OR SOME TYPE OF PUNISHMENT. 
(dont worry we will say if its not ok to share it)


**11.** DONT SIMPLY @everyone, anyone spamming @everyone will get MUTED FOR THE APPROPRIATE AMOUNT OF TIME. 

Note: *the server has special roles for things like games, hobbies and shit so you can ping that role instead.*



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