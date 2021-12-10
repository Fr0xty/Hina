import discord
from discord.ext import commands
from discord.ext.commands import has_permissions
from datetime import datetime, date, time
import requests, lxml
from bs4 import BeautifulSoup

import config



class utils(commands.Cog):

  def __init__(self, client):
    self.client = client

  
  client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())





  @commands.command()
  async def avatar(self, ctx, member: discord.Member=None):

    if member is None:  #no <@user> given  //  use ctx.author
      member = await self.client.fetch_user(ctx.author.id)

    links = ''

    if member.is_avatar_animated():
      gif = member.avatar_url_as(format="gif", size=1024)
      webp = member.avatar_url_as(format="webp", size=1024)
      
      links = f"[`.gif`]({gif}] [`.webp`]({webp})"

    else:
      png = member.avatar_url_as(format="png", size=1024)
      jpg = member.avatar_url_as(format="jpg", size=1024)
      jpeg = member.avatar_url_as(format="jpeg", size=1024)
      webp = member.avatar_url_as(format="webp", size=1024)

      links = f"[`.png`]({png}) [`.jpg`]({jpg}) [`.jpeg`]({jpeg}) [`.webp`]({webp})"
    
      
    embed = discord.Embed(
      description = links,
      color = 14982399
    )
    embed.set_author(name = f"{member}'s User Avatar", icon_url = self.client.user.avatar_url)
    embed.set_image(url=member.avatar_url)

    await ctx.send(embed=embed)





  @commands.command()
  async def idavatar(self, ctx, id=None):

    if id is None:  #no <user_id> given  //  use ctx.author
      member = await self.client.fetch_user(ctx.author.id)
      
    else:
      try:        #given <user_id> is int
        member = await self.client.fetch_user(int(id))
      except:     #not int
        await ctx.send("The provided <user_id> is incorrect.")
        return
      
    png = member.avatar_url_as(format="png", size=1024)
    jpg = member.avatar_url_as(format="jpg", size=1024)
    jpeg = member.avatar_url_as(format="jpeg", size=1024)
    webp = member.avatar_url_as(format="webp", size=1024)

    links = f"[`.png`]({png}) [`.jpg`]({jpg}) [`.jpeg`]({jpeg}) [`.webp`]({webp})"
    
    embed = discord.Embed(
      description = links,
      color = 14982399
    )
    embed.set_author(name = f"{member}'s User Avatar", icon_url = self.client.user.avatar_url)
    embed.set_image(url=member.avatar_url)

    await ctx.send(embed=embed)





  @commands.command()
  async def userinfo(self, ctx, member: discord.Member=None):

    if member is None:  #no <@user> given  //  use ctx.author
      user = await self.client.fetch_user(ctx.author.id)
      member = ctx.guild.get_member(ctx.author.id)
    else:
      user = await self.client.fetch_user(member.id)

    #---------------------------role

    roles = ''
    role_list = member.roles
    role_list.pop(0)

    for i in role_list:
      roles = "\u2800" + i.mention + roles
    roles = roles[1:]       #remove space from first index

    #---------------------------status

    status = [str(member.desktop_status), str(member.mobile_status), str(member.web_status)]
    emoji_status = []

    for i in status:
      if i == "online":
        emoji_status.append("<:status_online:908249121322852352>")
      elif i == "idle":
        emoji_status.append("<:status_idle:908249625218134026>")
      elif i == "dnd":
        emoji_status.append("<:status_donotdisturb:908249416060780574>")
      elif i == "offline":
        emoji_status.append("<:status_offline:908249115505332234>")
      else:
        emoji_status.append("???")

    #---------------------------guild_permissions

    guild_permissions = ''

    for i in member.guild_permissions:
      if i[1] == True:
        guild_permissions += i[0] + ", "

    if guild_permissions == '': #no permissions
      guild_permissions = "None"
    else:                       #remove the last comma
      guild_permissions = guild_permissions[:-2]

    #---------------------------badges
    public_flags = ''

    for i in user.public_flags:
      if i[1] == True:
        if i[0] == "staff":
          public_flags += "<:discord_staff:908516650331025458>"
        elif i[0] == "partner":
          public_flags += "<:discord_partner:908517486113202287>"
        elif i[0] == "hypesquad":
          public_flags += "<:HypeSquad_Event_Badge:908246675108266024>"
        elif i[0] == "bug_hunter":
          public_flags += "<:Bug_hunter:908516650133897287>"
        elif i[0] == "hypesquad_bravery":
          public_flags += "<:Hypesquad_bravery_badge:908246674818871306>"
        elif i[0] == "hypesquad_brilliance":
          public_flags += "<:Hypesquad_brilliance_badge:908246675116670986>"
        elif i[0] == "hypesquad_balance":
          public_flags += "<:Hypesquad_balance_badge:908246674755964978>"
        elif i[0] == "early_supporter":
          public_flags += "<:Early_supporter_badge:908246674743365632>"
        elif i[0] == "bug_hunter_level_2":
          public_flags += "<:bug_buster:908516650326843412>"
        elif i[0] == "verified_bot":
          public_flags += ""
        elif i[0] == "verified_bot_developer":
          public_flags += "<:Verified_developer_badge:908246675267657759>"
        else:
          return
          
    if public_flags == '':
      public_flags = "None"


    embed = discord.Embed(
      title = member,
      color = member.color,
      timestamp = datetime.utcnow()
    )
    embed.set_author(name = f"{member.name}'s User Avatar", icon_url = member.avatar_url)
    embed.set_thumbnail(url=member.avatar_url)
    embed.set_footer(text=f"Requested by {ctx.author}", icon_url=ctx.author.avatar_url)
    embed.add_field(name="Nickname", value=member.nick)
    embed.add_field(name="Mention", value=member.mention)
    embed.add_field(name="Status", value=f"desktop: {emoji_status[0]} \n mobile: {emoji_status[1]} \n web: {emoji_status[2]}")
    embed.add_field(name="Joined at", value=f"<t:{member.joined_at.strftime('%s')}:F>", inline=False)
    embed.add_field(name="Created at", value=f"<t:{member.created_at.strftime('%s')}:F>", inline=True)
    embed.add_field(name="badges", value=public_flags, inline=False)
    embed.add_field(name=f"Roles [{len(role_list)}]", value=roles, inline=False)
    embed.add_field(name=f"Server Permissions", value=guild_permissions, inline=False)
    embed.add_field(name="Pending Server Verification", value=member.pending, inline=False)
    embed.add_field(name="Is bot", value=user.bot)

    await ctx.send(embed=embed)



  

  @commands.command()
  async def epochtime(self, ctx):

    embed = discord.Embed(
      description = """
[Epoch Time Converter](https://www.epochconverter.com/) 

`<t:1624855717>` 	  <t:1624855717>	
`<t:1624855717:f>` 	<t:1624855717:f>
`<t:1624855717:F>` 	<t:1624855717:F>
`<t:1624855717:d>` 	<t:1624855717:d>
`<t:1624855717:D>` 	<t:1624855717:D>
`<t:1624855717:t>` 	<t:1624855717:t>
`<t:1624855717:T>` 	<t:1624855717:T>
`<t:1624855717:R>` 	<t:1624855717:R>
      """,
      color = 14982399,
      timestamp = datetime.utcnow()
    )
    embed.set_author(name = "Epoch Time Example")
    embed.set_image(url="https://cdn.discordapp.com/attachments/907586559719645204/908234637380288552/sheeeeeeeesh.jpeg")
    embed.set_footer(text=f"Requested by {ctx.author}", icon_url = ctx.author.avatar_url)
    await ctx.send(embed = embed)





  @commands.command(aliases=['gs'])
  async def googlesearch(self, ctx, *, keyword):

    headers = {   #browse as human user
      'User-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582'
    }

    params = {
      'q': keyword, # search keyword
      'gl': 'my',       # region
      'hl': 'en',       # language
    }

    html = requests.get('https://www.google.com/search', headers=headers, params=params)
    soup = BeautifulSoup(html.text, 'lxml')

    r = ''

    # info
    info = soup.select("span.hgKElc")

    if info != []:
      r += f"__Info Card:__ \n > {info[0].text} \n"

    # main websites
    for result in soup.select('.tF2Cxc'):
      title = result.select_one('.DKV0Md').text
      link = result.select_one('.yuRUbf a')['href']
      desc = result.select_one('.IsZvec').text
      

      r += f"[{title}]({link}) \n {desc} \n\n"

    stats = soup.find('div', id='result-stats').text
    
    embed = discord.Embed(
      title=f"Search Result for: {keyword}",
      description = r,
      color = 14982399,
      timestamp = datetime.utcnow() 
    )
    embed.set_footer(text=f"{stats} \n Requested by: {ctx.author}", icon_url=ctx.author.avatar_url)
    await ctx.send(embed=embed)





  @commands.command(aliases=['adgs'])
  async def advancegooglesearch(self, ctx, region, language, *, keyword):

    headers = {   #browse as human user
      'User-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582'
    }

    params = {
      'q': keyword, # search keyword
      'gl': region,       # region
      'hl': language,       # language
    }

    html = requests.get('https://www.google.com/search', headers=headers, params=params)
    soup = BeautifulSoup(html.text, 'lxml')

    r = ''

    # info
    info = soup.select("span.hgKElc")

    if info != []:
      r += f"__Info Card:__ \n > {info[0].text} \n"

    # main websites
    for result in soup.select('.tF2Cxc'):
      title = result.select_one('.DKV0Md').text
      link = result.select_one('.yuRUbf a')['href']
      desc = result.select_one('.IsZvec').text
      

      r += f"[{title}]({link}) \n {desc} \n\n"

    stats = soup.find('div', id='result-stats').text
    
    embed = discord.Embed(
      title=f"Search Result for: {keyword}",
      description = r,
      color = 14982399,
      timestamp = datetime.utcnow() 
    )
    embed.set_footer(text=f"{stats} \n Requested by: {ctx.author}", icon_url=ctx.author.avatar_url)
    await ctx.send(embed=embed)





  @commands.command()
  @has_permissions(manage_messages=True)
  async def prune(self, ctx, num=None):

    if num is None:
      num = 2

    else:
      try:
        num = int(num) + 1

      except:
        await ctx.send("Please provide a number.")
        return
    
    await ctx.channel.purge(limit=num)

    



  @commands.command()
  async def ping(self, ctx):
    await ctx.reply(f'Pong! {round (self.client.latency * 1000)}ms')





def setup(client):
  client.add_cog(utils(client))