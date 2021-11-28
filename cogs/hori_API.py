import discord
from discord.ext import commands
import requests

class hori_API(commands.Cog):

  def __init__(self, client):
    self.client = client



  #declare prefix
  commands = commands.Bot(command_prefix = '(')





  #Commands--------------------------------------------------------------------

  @commands.command()
  async def waifu(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/sfw/waifu/').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/sfw/waifu/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")

    



  @commands.command()
  async def all(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/sfw/all/').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/sfw/all/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")





  @commands.command()
  async def maid(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/sfw/maid/').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/sfw/maid/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")





  @commands.command()
  async def ass(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/ass/').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/ass/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")





  @commands.command(aliases=["lewd"])
  async def ecchi(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/ecchi/').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/ecchi/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")





  @commands.command()
  async def ero(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/ero/').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/ero/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")





  @commands.command()
  async def hentai(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/hentai/').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/hentai/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def nsfwmaid(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/maid/').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/maid/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def milf(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/milf/').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/milf/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def oppai(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/oppai').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/oppai/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def oral(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/oral').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/oral/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def paizuri(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/paizuri').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/paizuri/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")


  @commands.command()
  async def selfies(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/selfies').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/selfies/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")


  async def uniform(self, ctx, num=None):

    if num is None: #not specified
      pic = requests.get('https://api.hori.ovh/nsfw/uniform').json()
      imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
      imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
      await ctx.send(embed = imgGenEmbed)

    else:           #inputed something
      try:          
        num = int(num)
        if num > 20 and num > 0:
          await ctx.send("Please do not exceed 20!")
        
        else:
          for i in range(num):
            pic = requests.get('https://api.hori.ovh/nsfw/uniform/').json()
            imgGenEmbed = discord.Embed(title = pic['tags'][0]['name'], colour = 14982399)
            imgGenEmbed.set_image(url = pic['tags'][0]['images'][0]['url'])
            await ctx.send(embed = imgGenEmbed)
      except:
        await ctx.send("The number is invalid!")


  


def setup(client):
  client.add_cog(hori_API(client))