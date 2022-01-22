import discord
import asyncio
from pyston import PystonClient, File
from discord.ext import commands
from datetime import datetime

import config



class games(commands.Cog):

    def __init__(self, client):
        self.client = client


    client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())

    @commands.command()
    async def run(self, ctx, *, code):

        if not code.startswith("```"):
            await ctx.send("Wrong Format, pls do `hina help coderunner`")
            return
        
        code = code.replace("```", "")
        lang = code.splitlines()[0]
        code = '\n'.join(code.splitlines()[1:])
        
        client = PystonClient()
        output = await client.execute(lang, [File(code)])
        if output.raw_json['run']['output'] == '' and output.raw_json['run']['code'] == 0:
            embed = discord.Embed(
                title="Result:",
                description = "Code ran without any exceptions...\n\u2800",
                timestamp=datetime.utcnow(),
                color=config.hina_color
            )
        else:
            embed = discord.Embed(
                title="Result:",
                description = f"```{output}```\n\u2800",
                timestamp=datetime.utcnow(),
                color=config.hina_color
            )

        embed.add_field(name="info", value=f"Language: `{output.langauge}`\nVersion: `{output.version}`\nExtension: `{lang}`")
        embed.set_author(name="Code Runner")
        embed.set_footer(text=f"Requested by: {ctx.author}", icon_url=ctx.author.avatar_url)
        await ctx.send(embed=embed)
        await ctx.message.add_reaction(self.client.get_emoji(920600099556589569))







def setup(client):
    client.add_cog(games(client))