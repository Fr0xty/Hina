import discord
import os
from discord.ext import commands
import asyncio
import random
from discord_components import *
from datetime import datetime

import config
from keep_alive import keep_alive                         #keep online



client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())
    
client.remove_command('help')                                 #remove default built-in help command




@client.event                                                                    
async def on_ready():

    print(f"We have logged in as {client.user}")
    DiscordComponents(client)
    


    playingStatus = ['with my creator!', 'あたしの創造者と', 'in Japan']
    watchingStatus = ['over my creator!', 'anime', 'YouTube', 'paint dry', 'アニメ', 'your every move']
    listeningStatus = ['music with my creator', 'your secrets']

    while True:
        statusType = random.randint(0, 2)         

        if statusType == 0:                 #playing status
            statusNum = random.randint(0, 2)
            await client.change_presence(status=discord.Status.online, activity=discord.Activity(type=discord.ActivityType.playing, name=playingStatus[statusNum]))

        elif statusType == 1:             #watching status
            statusNum = random.randint(0, 5)
            await client.change_presence(status=discord.Status.online, activity=discord.Activity(type=discord.ActivityType.watching, name=watchingStatus[statusNum]))

        else:             #listening status
            statusNum = random.randint(0, 1)
            await client.change_presence(status=discord.Status.online, activity=discord.Activity(type=discord.ActivityType.listening, name=listeningStatus[statusNum]))

        await asyncio.sleep(600)        #change every 10 minutes





@client.event             #send errors
async def on_command_error(ctx, exception):


    if isinstance(exception, discord.ext.commands.errors.MissingRequiredArgument):
        embed = discord.Embed(
            title = "Missing Required Argument!",
            color = config.hina_color,
            timestamp = datetime.utcnow(),
            description = f"""
`<{exception.param}>` argument is missing!

__Usage:__
`{ctx.command.usage}`
            """
        )
        embed.set_footer(text=f"Error invoked by {ctx.author}", icon_url=ctx.author.avatar_url)
        await ctx.send(embed=embed)



    elif isinstance(exception, discord.ext.commands.errors.CommandNotFound):
        embed = discord.Embed(
            title = "Command Not Found!",
            color = config.hina_color,
            timestamp = datetime.utcnow(),
            description = f"""
{exception.args[0]}

__For more info on my commands do:__
`hina help`
            """
        )
        embed.set_footer(text=f"Error invoked by {ctx.author}", icon_url=ctx.author.avatar_url)
        await ctx.send(embed=embed)



    else:
        await ctx.send(f"```{str(exception)}```")





for filename in os.listdir('./cogs'):                                             #load all extensions in 'cogs' folder

    if filename.endswith('.py'):
        client.load_extension(f'cogs.{filename[:-3]}')

client.load_extension("jishaku")

help_command=None





keep_alive()                                                    #stay online
my_secret = os.environ['Token']        
client.run(my_secret)                                                                                #login