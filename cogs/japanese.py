import discord
import asyncio
import random
import json
from discord.ext import commands

import config



class japanese(commands.Cog):

  def __init__(self, client):
    self.client = client
    self.stop = False
    self.stop_user = ''


  client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())





  @commands.command()
  async def quiz_stop(self, ctx):
    self.stop = True
    self.stop_user = ctx.author.mention
    




  @commands.command()
  async def teform(self, ctx):


    startembed = discord.Embed(
      title = "~te Form Quiz (て型)",
      description = "Starting in 5 seconds",
      color = 14982399
    )
    await ctx.send(embed=startembed)          #send starting embed

    await asyncio.sleep(5)                    #wait 5 seconds
    

    self.stop = False
    while self.stop != True:

      with open('./json/teform.json', 'r') as f:
        data = json.load(f)                                

      question_num = random.randint(0, len(data) - 1)       #get random number => random question in list
      question = data[question_num]

      que_Embed = discord.Embed(
        title = "~te Form Quiz",
        description = "Conjugate the verb into its ~te form!",
        color = 14982399
      )
      que_Embed.set_image(url=question['dict_form_url'])
    
      await ctx.send(embed=que_Embed)



      def check(msg):
        return msg.channel == ctx.channel and msg.content == question['te_form']
        

      try:
        msg = await self.client.wait_for('message', timeout = 20.0, check = check)

        await ctx.send(f"{msg.author.mention} got it right!")
        await asyncio.sleep(3)


      except asyncio.TimeoutError:
        await ctx.send('No one got it right')
        await asyncio.sleep(5)

    await ctx.send(f'Quiz stopped by {self.stop_user}')





  @commands.command()
  async def info(self, ctx, quiz_name = None):

    if quiz_name == None:
      await ctx.send("Please provide a quiz name!")
      return


    quizes = ['teform']

    if quiz_name in quizes:

      if quiz_name == 'teform':
        explanation = discord.Embed(
          title = "What are ~te forms?",
          description = """
~te form is essential in the Japanese language, it is a form by conjugating verbs!

__Example:__
dictionary form: 待つ
~te form: 待って""",
          color = 14982399
        )
        explanation.set_image(url="https://cdn.discordapp.com/attachments/857205281409466368/857206260009140289/Screenshot_2020-02-15-21-16-10-708_com.google.android.youtube.jpg")
        explanation.add_field(name="Why do you need to use them?", value="It can be used to request someone, or futhur modified into a present progressive form(-ing) and many more. \n\n You can learn more about ~te forms [here](https://www.thoughtco.com/the-japanese-verb-form-te-2027918) \n\n\n **Cheat sheet:**")

        await ctx.send(embed=explanation)

    else:
      await ctx.send(f"'`{quiz_name}`' quiz: is not found!")

    



#admin command--------------------------------------------------------------------------------
  @commands.command()
  async def tfadd(self, ctx, dict_form=None, te_form=None, ctype=None):


    if ctx.author.id == 395587171601350676:
      #fail
      if dict_form == None or te_form == None or ctype == None:
        await ctx.send("One of the required parameter is missing \n\n Syntax: ```tfadd <dict_form> <te_form> <conjugation_type>```")
        return
      

      #success
      question = {"dict_form_url": dict_form, "te_form": te_form, "ctype": int(ctype)}
      await ctx.send(question)

      with open('./json/teform.json', 'r') as f:
        data = json.load(f)

      data.append(question)

      with open('./json/teform.json', 'w') as f:
        json.dump(data, f, indent=2)
      
      await ctx.send("dumped word into json file successfully")

    else:
      await ctx.send("Unauthorized access, this command is only usable by the creator!")





  @commands.command()
  async def tfread(self, ctx, index):
    
    if ctx.author.id == 395587171601350676:
      
      with open('./json/teform.json', 'r') as f:
        data = json.load(f)

      await ctx.send(f"Amount of words: {len(data)}")
      

      i = 0
      while i != len(data):
        if data[i]['ctype'] == int(index):
          await ctx.send(data[i])

        i += 1

    else:
      await ctx.send("Unauthorized access, this command is only usable by the creator!")





  @commands.command()
  async def tftype(self, ctx):
    type1 = 0
    type2 = 0
    type3 = 0
    type4 = 0
    type5 = 0
    type6 = 0
    type7 = 0
    type8 = 0

    with open('./json/teform.json', 'r') as f:
      data = json.load(f)


    i = 0
    while i != len(data):
      if data[i]['ctype'] == 1:
        type1 += 1

      if data[i]['ctype'] == 2:
        type2 += 1

      if data[i]['ctype'] == 3:
        type3 += 1

      if data[i]['ctype'] == 4:
        type4 += 1

      if data[i]['ctype'] == 5:
        type5 += 1

      if data[i]['ctype'] == 6:
        type6 += 1

      if data[i]['ctype'] == 7:
        type7 += 1

      if data[i]['ctype'] == 8:
        type8 += 1
      i += 1

    await ctx.send(f"{type1}, {type2}, {type3}, {type4}, {type5}, {type6}, {type7}, {type8}")





def setup(client):
  client.add_cog(japanese(client))