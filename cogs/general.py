import discord
from discord.ext import commands
import asyncio
import requests
from discord_components import *


client = discord.Client()



class general(commands.Cog):

  def __init__(self, client):
    self.client = client

    self.inviteEmbed = discord.Embed( #embed2
      description = 'https://discord.com/api/oauth2/authorize?client_id=769125937731338290&permissions=8&scope=bot',
      colour = 14982399
    )
    


  #declare prefix
  commands = commands.Bot(command_prefix = '(')
  commands.remove_command('help')                 #remove default built-in help command
  





  @commands.command()
  async def rename(self, ctx, name):
    if ctx.author.id == 395587171601350676:
      await self.client.user.edit(username=name)




  @commands.command()
  async def invite(self, ctx):
    self.inviteEmbed.set_author(name = "My invite link♡", icon_url = self.client.user.avatar_url)
    await ctx.send(embed = self.inviteEmbed,
    components = [Button(style=5, url="https://discord.com/api/oauth2/authorize?client_id=769125937731338290&permissions=8&scope=bot", label = 'Invite Me!', emoji = self.client.get_emoji(884003530933944341))
    ]
    )



  @commands.command()
  async def funfact(self, ctx):

    fact = requests.get('https://uselessfacts.jsph.pl/random.json?language=en').json()
    await ctx.reply(fact['text'])






  @commands.command()
  async def joke(self, ctx):

    joke = requests.get('https://v2.jokeapi.dev/joke/Any').json()


    if joke['type'] == 'single':    #singular line joke
      await ctx.reply(joke['joke'])

    else:                           #setup, delivery type jokes
      await ctx.reply(joke['setup'] + '\n' + '||' + joke['delivery'] + '||')






  @commands.command()
  async def act(self, ctx, member: discord.Member, *, message=None):

    if message == None:
      await ctx.send(f'Please provide a message with that!')
      return

    if member.nick:     #if user has nickname
      webhook = await ctx.channel.create_webhook(name=member.nick)
      await webhook.send(str(message), username=member.nick, avatar_url=member.avatar_url)
      await ctx.message.delete()
    
    else:
      webhook = await ctx.channel.create_webhook(name=member.name)
      await webhook.send(str(message), username=member.name, avatar_url=member.avatar_url)
      await ctx.message.delete()


    webhooks = await ctx.channel.webhooks()
    for webhook in webhooks:
      await webhook.delete()











def setup(client):
  client.add_cog(general(client))