import discord
from discord.ext import commands
import requests
from discord_components import *

class hori_API(commands.Cog):

  def __init__(self, client):
    self.client = client



  #declare prefix
  commands = commands.Bot(command_prefix = '(')





  #Commands--------------------------------------------------------------------

  @commands.command()
  async def random(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/random/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/random/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])

            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")





  @commands.command()
  async def waifu(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/sfw/waifu/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/sfw/waifu/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])

            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")





  @commands.command()
  async def maid(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/sfw/maid/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/sfw/maid/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")





  @commands.command()
  async def ass(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/ass/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/ass/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")





  @commands.command(aliases=["lewd"])
  async def ecchi(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/ecchi/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/ecchi/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")





  @commands.command()
  async def ero(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/ero/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/ero/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")





  @commands.command()
  async def hentai(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/hentai/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/hentai/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def nsfwmaid(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/maid/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/maid/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def milf(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/milf/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/milf/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def oppai(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/oppai/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/oppai/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")



  @commands.command()
  async def oral(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/oral/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/oral/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def paizuri(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/paizuri/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/paizuri/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def selfies(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/selfies/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/selfies/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")


  async def uniform(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.waifu.im/nsfw/uniform/').json()

      imgGenEmbed = discord.Embed(
        title = pic['images'][0]['tags'][0]['name'],
        colour = int(pic['images'][0]['dominant_color'][1:], 16)
        )
      imgGenEmbed.set_image(url = pic['images'][0]['url'])

      await ctx.send(embed = imgGenEmbed, components = 
        [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
      )
    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.waifu.im/nsfw/uniform/').json()

            imgGenEmbed = discord.Embed(
              title = pic['images'][0]['tags'][0]['name'],
              colour = int(pic['images'][0]['dominant_color'][1:], 16)
              )
            imgGenEmbed.set_image(url = pic['images'][0]['url'])
            
            await ctx.send(embed = imgGenEmbed, components = 
              [Button(label="Source", style=5, url=pic['images'][0]['source'], emoji=self.client.get_emoji(885845964466839563))]
            )
      except:
        await ctx.send("The number is invalid!")


  


def setup(client):
  client.add_cog(hori_API(client))