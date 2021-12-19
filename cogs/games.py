import discord
from discord.ext import commands

import config



class games(commands.Cog):

  def __init__(self, client):
    self.client = client


  client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())











def setup(client):
  client.add_cog(games(client))