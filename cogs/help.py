import discord
from discord.ext import commands
from discord_components import *
import asyncio
from datetime import datetime

import config



class help(commands.Cog):

  def __init__(self, client):

    self.client = client
    self.main_page_button = Button(label="Main Page", style=ButtonStyle.blue)
    self.delete_button = Button(label="Delete", style=ButtonStyle.red)





  @commands.Cog.listener()
  async def on_select_option(self, interaction):

    owner = await self.client.fetch_user(395587171601350676)

    if interaction.values[0] == "behavioral":
      await interaction.message.edit(embed = config.helpEmbed.behavioral(self.client))
      await interaction.defer(edit_origin=True)

    if interaction.values[0] == "general":
      await interaction.message.edit(embed = config.helpEmbed.general(self.client))
      await interaction.defer(edit_origin=True)

    if interaction.values[0] == "fun":
      await interaction.message.edit(embed = config.helpEmbed.fun(self.client))
      await interaction.defer(edit_origin=True)

    if interaction.values[0] == "emoji":
      await interaction.message.edit(embed = config.helpEmbed.emoji(self.client))
      await interaction.defer(edit_origin=True)
    
    if interaction.values[0] == "music":
      await interaction.message.edit(embed = config.helpEmbed.music(self.client))
      await interaction.defer(edit_origin=True)

    if interaction.values[0] == "image":
      await interaction.message.edit(embed = config.helpEmbed.image(self.client))
      await interaction.defer(edit_origin=True)

    if interaction.values[0] == "japanese":
      await interaction.message.edit(embed = config.helpEmbed.japanese(self.client))
      await interaction.defer(edit_origin=True)

    if interaction.values[0] == "utility":
      await interaction.message.edit(embed = config.helpEmbed.utility(self.client))
      await interaction.defer(edit_origin=True)

    if interaction.values[0] == "games":
      await interaction.message.edit(embed = config.helpEmbed.games(self.client))
      await interaction.defer(edit_origin=True)

    if interaction.values[0] == "creator":
      await interaction.message.edit(embed = config.helpEmbed.creator(self.client, owner))
      await interaction.defer(edit_origin=True)





  client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())





  @commands.command(usage="help [category]", help="get explanation on my commands")
  async def help(self, ctx, category=None):

    owner = await self.client.fetch_user(395587171601350676)

    if category is not None:
      if category.lower() == "behavioral":
        await ctx.send(embed = config.helpEmbed.behavioral(self.client))
        return
      elif category.lower() == "general":
        await ctx.send(embed=config.helpEmbed.general(self.client))
        return
      elif category.lower() == "fun":
        await ctx.send(embed=config.helpEmbed.fun(self.client))
        return
      elif category.lower() == "emoji":
        await ctx.send(embed=config.helpEmbed.emoji(self.client))
        return
      elif category.lower() == "music":
        await ctx.send(embed=config.helpEmbed.music(self.client))
        return
      elif category.lower() == "image":
        await ctx.send(embed=config.helpEmbed.image(self.client))
        return
      elif category.lower() == "japanese":
        await ctx.send(embed=config.helpEmbed.japanese(self.client))
        return
      elif category.lower() == "utility":
        await ctx.send(embed=config.helpEmbed.utility(self.client))
        return
      elif category.lower() == "games":
        await ctx.send(embed=config.helpEmbed.games(self.client))
        return
      elif category.lower() == "creator":
        await ctx.send(embed=config.helpEmbed.creator(self.client, owner))
        return
      else:
        await ctx.send(f"There is no category named: {category}")
        return




    component = [
      Select(
        placeholder = 'Select Your Category!',
        options = [
          SelectOption(label="Behavoiral", value="behavioral", emoji = self.client.get_emoji(900570132210929715), description="I'm a human too ok, baka!"),
          SelectOption(label="General", value="general", emoji = self.client.get_emoji(885845968120066070), description="Basic or common commands"),
          SelectOption(label="Fun", value="fun" , emoji=self.client.get_emoji(885845964835926047), description="Some fun commmands to mess with."),
          SelectOption(label="Emoji", value="emoji", emoji=self.client.get_emoji(885845965469253632), description="Free nitro perks for emoji."),
          SelectOption(label="Music", value="music", emoji="🎵", description="Music commands."),
          SelectOption(label="Image", value="image", emoji=self.client.get_emoji(895182438064590879), description="Get all those waifu and hentai pics baby!"),
          SelectOption(label="Japanese", value="japanese", emoji="🎌", description="Japanese learning quizes and games!"),
          SelectOption(label="Utility", value="utility", emoji="🛠️", description="Useful technical commands"),
          SelectOption(label="Games", value="games", emoji="🎲", description="Mini games!"),
          SelectOption(label="Creator", value="creator", emoji=self.client.get_emoji(885845967029551124), description="Hidden Commands")
          ]
        ),
        [self.main_page_button, self.delete_button],
        [Button(label="Invite Me!", style=5, url="https://discord.com/api/oauth2/authorize?client_id=769125937731338290&permissions=8&scope=bot", emoji = self.client.get_emoji(884003530933944341)),
        Button(label="Join UwU Server", style=5, url="https://discord.gg/VtQRrVCxg8", emoji=self.client.get_emoji(907573738369875998)),
        Button(label="Github Repo", style=5, url="https://github.com/Fr0xty/Hina", emoji=self.client.get_emoji(913019791743262772))]
    ]
    MAIN = config.helpEmbed.main(self.client, ctx)

    timedOut = False
    sent_help = await ctx.send(embed = MAIN, components = component)
      
    while timedOut == False: 

      try:
        interaction = await self.client.wait_for("button_click", timeout = 600)
        req = interaction.component.label

        if req == "Main Page":
          await sent_help.edit(embed=MAIN)
          await interaction.defer(edit_origin=True)

        if req == "Delete":
          await sent_help.delete()
          await ctx.message.add_reaction(self.client.get_emoji(920600099556589569))
          return

      except asyncio.TimeoutError:
        await sent_help.delete()
        await ctx.message.add_reaction(self.client.get_emoji(920600099556589569))
        timedOut = True
        



  @commands.command(usage="commandhelp <command_name>", help="get deeper explaination on a certain command")
  async def commandhelp(self, ctx, command_name):
    
    for command in self.client.commands:
      if command.name == command_name:
        embed = discord.Embed(
          title=f"Command: {command_name}",
          color=config.hina_color,
          timestamp=datetime.utcnow(),
          description=f"""
__Usage:__
`{command.usage}`

__What it does:__
{command.help}
          """
        )
        embed.set_footer(text=f"Requested by: {ctx.author}", icon_url=ctx.author.avatar_url)
        await ctx.send(embed=embed)
        return

    await ctx.send(f"Can't find command named: {command_name}")



def setup(client):
  client.add_cog(help(client))