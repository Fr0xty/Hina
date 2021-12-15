import discord
from discord.ext import commands
import asyncio
import requests
from discord_components import *
import random
import translators as ts
from datetime import datetime

import config



class general(commands.Cog):

  def __init__(self, client):
    self.client = client

    self.inviteEmbed = discord.Embed( #embed2
      description = 'https://discord.com/api/oauth2/authorize?client_id=769125937731338290&permissions=8&scope=bot',
      colour = config.hina_color
    )
    

  client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())
  




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





  @commands.command()
  async def padoru(self, ctx, member: discord.Member=None):
    links = ['https://c.tenor.com/xYq4RnxDODEAAAAC/padoru-padoru-anime.gif',
    'https://c.tenor.com/ddSa-psbO3sAAAAS/fate-padoru-christmas.gif',
    'https://c.tenor.com/XUCU0z2agOQAAAAS/meme-padoru.gif',
    'https://c.tenor.com/OMnSECt8MewAAAAS/christmas-padoru-padoru.gif',
    'https://c.tenor.com/ukGbS9ddkfsAAAAS/umu-padoru.gif',
    'https://c.tenor.com/gKnDBdfrKHkAAAAS/padoru-merry-christmas.gif',
    'https://c.tenor.com/BF_fkoVmWfYAAAAS/padoru-dance.gif',
    'https://c.tenor.com/XsCye4oLjMMAAAAS/anime-padoru.gif',
    'https://c.tenor.com/pfkcmc3Y7SUAAAAC/padoru-konosuba.gif',
    'https://c.tenor.com/W6g0j1J4qQAAAAAC/saber-christmas.gif',
    'https://c.tenor.com/jsNTJtSD_aoAAAAC/raphtalia-padoru.gif']

    link = random.choice(links)

    if member is None:
      embed = discord.Embed(
        title = f"You've been padoru'd by {ctx.author.display_name}!",
        color = 16732485
      )
    else:
      embed = discord.Embed(
        title = f"{member.display_name} got padoru'd by {ctx.author.display_name}!",
        color = 16732485
      )

    embed.set_image(url=link)
    embed.set_author(name=ctx.author, icon_url=ctx.author.avatar_url)

    await ctx.send(embed=embed)





  @commands.command()
  async def translate(self, ctx, language, *, text=None):
    
    if not text:
      if not ctx.message.reference:
        await ctx.send("Please include a text to translate or reply to a message you want me to translate!")
        return

      message = await ctx.channel.fetch_message(ctx.message.reference.message_id)
      await ctx.send(ts.google(message.content, to_language=language))

    else:
      await ctx.send(ts.google(text, to_language=language))




  @commands.command()
  async def spotify(self, ctx, member: discord.Member=None):

    if not member:
      member = ctx.author
    spotify_activity = False

    for activity in member.activities:
      if isinstance(activity, discord.Spotify): # is listening to spotify
        artists = ''
        for artist in activity.artists:
          artists += f"{artist}, "
        artists = artists[:-2]

        embed = discord.Embed(
          title=activity.title,
          url=f"https://open.spotify.com/track/{activity.track_id}",
          color = activity.color,
          timestamp=datetime.utcnow(),
          description=f"""
artist(s):
`{artists}`

album:
`{activity.album}`

song started:
<t:{activity.start.strftime('%s')}:t> | <t:{activity.start.strftime('%s')}:R>

ending song:
<t:{activity.end.strftime('%s')}:t> | <t:{activity.end.strftime('%s')}:R>

started listening curent song:
<t:{activity.created_at.strftime('%s')}>

song duration: `{config.convert_seconds(activity.duration.total_seconds())}`

party id: `{activity.party_id}`
          """
        )
        embed.set_author(name=f"{member}'s Spotify Activity", icon_url=member.avatar_url)
        embed.set_thumbnail(url=activity.album_cover_url)
        embed.set_footer(text=f"Requested by: {ctx.author}", icon_url=ctx.author.avatar_url)
        await ctx.send(embed=embed)
        spotify_activity = True
    
    if not spotify_activity:
      await ctx.send(f"{member.mention} is not listening to any songs on Spotify")


def setup(client):
  client.add_cog(general(client))