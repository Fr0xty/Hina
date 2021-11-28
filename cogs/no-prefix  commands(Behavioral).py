import discord
from discord.ext import commands

class noPrefixCommands(commands.Cog):

  def __init__(self, client):
    self.client = client






  #Commands-----------------------------------------------------------



  @commands.Cog.listener()
  async def on_message(self, ctx):

    greetings = ["hello", "hi", "yo", "sup", "wassup", "yahhallo", "nyahhallo","こんにちは", "おはよう", "こんばんは", "ハロー", "おっす", "にゃっはろー", "やっはろー", "にゃんぱすー"]


    for greeting in greetings:
      if greeting == ctx.content.lower():
        await ctx.reply(f'{greeting}, {ctx.author.mention}!')








    if len(ctx.content) >= 3:            #avoid errors // using animated emojis without nitro command

      if ctx.content[0] == ';' and ctx.content[-1] == ';': 

        emoji_name = ctx.content[1 : -1]
        for emoji in ctx.guild.emojis:
          
          if emoji_name  == emoji.name:     #found emoji

            if ctx.author.nick:     #if author has nickname
              webhook = await ctx.channel.create_webhook(name=ctx.author.nick)
              await webhook.send(emoji, username=ctx.author.nick, avatar_url=ctx.author.avatar_url)
              await ctx.delete()
            
            else:                   #else use username
              webhook = await ctx.channel.create_webhook(name=ctx.author.name)
              await webhook.send(emoji, username=ctx.author.name, avatar_url=ctx.author.avatar_url)
              await ctx.delete()


            webhooks = await ctx.channel.webhooks()
            for webhook in webhooks:
              await webhook.delete()





def setup(client):
  client.add_cog(noPrefixCommands(client))