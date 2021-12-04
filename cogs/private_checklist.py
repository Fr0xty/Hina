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





def setup(client):
  client.add_cog(checklist(client))