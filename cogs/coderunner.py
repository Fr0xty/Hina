import discord
import asyncio
from pyston import PystonClient, File
from discord.ext import commands

import config



class games(commands.Cog):

    def __init__(self, client):
        self.client = client


    client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())

    @commands.command()
    async def run(self, ctx, *, code):
        if ctx.author.id != 395587171601350676:
            await ctx.reply("You have no permission to use this command!")
            return

        if not code.startswith("```"):
            await ctx.send("Wrong Format")
            return
        
        code = code.replace("`", "")
        lang = code.splitlines()[0]
        code = '\n'.join(code.splitlines()[1:])
        
        client = PystonClient()
        output = await client.execute(lang, [File(code)])
        await ctx.send(f"```{output}```")







def setup(client):
    client.add_cog(games(client))