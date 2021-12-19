import discord
import json
from discord.ext import commands
import asyncio

import config


class checklist(commands.Cog):

  def __init__(self, client):
    self.client = client


  client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())





  @commands.command()
  async def cladd(self, ctx, *, arg):

    if ctx.author.id != 395587171601350676:   #if not me then stop
      await ctx.send("You don't have permission to use this command!")
      return
    
    song, url = arg.split(',')      #separate the arg to songname and url
    url = url.replace(' ', '')      #remove whitespace from url
    
    with open('./json/checklist.json', 'r') as f:   #access json
      data = json.load(f)

    var = {'songname': song, 'url': url}                                          #put info into structure
    await ctx.send(f"__Song added to checklist:__ \n **name:** {song} \n **url:** <{url}>")   #assure user the info
    data.append(var)                              #add into variable

    with open('./json/checklist.json', 'w') as f:       #store back into json
      json.dump(data, f, indent=2)
    
    await ctx.message.add_reaction('<:menheraChanOK:902096184645124146>') #reaction to assure task is completed



    

  @commands.command()
  async def cl(self, ctx):

    with open('./json/checklist.json', 'r') as f:   #access json
      data = json.load(f)


    var = ''
    num = 1
    for i in data:
      
      var += f"**{num}.** [{i['songname']}]({i['url']}) \n"
      num += 1


    embed = discord.Embed(
      title = 'Practice Check List',
      description = var,
      color = 13824127
    )
    await ctx.send(embed = embed)





  @commands.command()
  async def clremove(self, ctx, num):

    if ctx.author.id != 395587171601350676:   #if not me then stop
      await ctx.send("You don't have permission to use this command!")
      return


    with open('./json/checklist.json', 'r') as f:
      data = json.load(f)

    song = data[int(num) - 1]
    await ctx.send(f"""
**Are you sure you want to remove the following song off the checklist?**
*song:* {song['songname']}
*url:* <{song['url']}>

If you are sure please type 'CONFIRM' to confirm your action. Else, type 'no' to cancel.
""")

    def check(msg):
      return msg.content == 'CONFIRM' or msg.content == 'no' and msg.author == ctx.author

    try:
      msg = await self.client.wait_for('message', timeout =30.0, check = check)

    except asyncio.TimeoutError:
      await ctx.send('Timedout, action is cancelled!')

    else:
      if msg.content == 'CONFIRM':
        data.pop(int(num)-1)
        with open('./json/checklist.json', 'w') as f:       #store back into json
          json.dump(data, f, indent=2)

        await ctx.send('Successfully removed song from your checklist!')

      else:
        await ctx.send('Successfully cancelled!')







  @commands.command()
  async def pls(self, ctx, stuff):
    if stuff.lower() == "symbol":
      await ctx.reply("ø")





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







def setup(client):
  client.add_cog(checklist(client))