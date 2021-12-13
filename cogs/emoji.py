import discord
import asyncio
from discord.ext import commands

import config



class emoji(commands.Cog):

  def __init__(self, client):
    self.client = client


  client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())





  @commands.command()
  async def getemoji(self, ctx, server_id=None):

    if server_id is None:
      server = self.client.get_guild(ctx.guild.id)
    else:
      server = self.client.get_guild(int(server_id))
    
    pages = []
    if server != None:      #bot in server
      n = 0
      var = ''
      num = 0

      for emoji in server.emojis:
        num += 1

        if n == 20:
          pages.append(var.replace("\\", ""))
          var = ''
          n = 0

        var += f"{emoji} - `\{emoji}` \n"

        n += 1

      #after full pages
      if n >= 1:
          pages.append(var.replace("\\", ""))

      page = 0
      
      if server.icon:
        server_icon = server.icon_url
      else:
        server_icon = self.client.user.avatar_url

      eembed = discord.Embed(
        title = f"Emoji list for {server}",
        description = pages[page],
        color = config.hina_color
      )
      eembed.set_author(name=f"Page ({page + 1} / {len(pages)})", icon_url = server_icon)

      timedOut = False
      emoji_embed = await ctx.reply(embed = eembed)
      await emoji_embed.add_reaction('a<a:Aqua_left:879530551038603264>')
      await emoji_embed.add_reaction('a<a:Aqua_right:879530551881637930>')

      while timedOut == False: 

        try:
          def check(reaction, user):
            return reaction.message.id == emoji_embed.id and user != self.client.user #check added reactions

          reaction, user = await self.client.wait_for('reaction_add', timeout = 60.0, check = check)
          

          if reaction.emoji.id == 879530551038603264 and page > 0:  #detect flip left && not the first page

            page -= 1
            eembed = discord.Embed(
              title = f"Emoji list for {server} [{num}]",
              description = pages[page],
              color = config.hina_color
            )
            eembed.set_author(name=f"Page ({page + 1} / {len(pages)})", icon_url = server_icon)

            await emoji_embed.edit(embed = eembed)          #flip 
            await emoji_embed.remove_reaction('a<a:Aqua_left:879530551038603264>', user)


          if reaction.emoji.id == 879530551881637930 and page < len(pages) -1:  #detect flip right && not the last page

            page += 1
            eembed = discord.Embed(
              title = f"Emoji list for {server}",
              description = pages[page],
              color = config.hina_color
            )
            eembed.set_author(name=f"Page ({page + 1} / {len(pages)})", icon_url = server_icon)

            await emoji_embed.edit(embed = eembed)          #flip
            await emoji_embed.remove_reaction('a<a:Aqua_right:879530551881637930>', user)

        except asyncio.TimeoutError:
          timedOut = True
          await emoji_embed.clear_reactions()

    else:                   #bot not in server
      await ctx.reply("I'm not in the server!")





  @commands.command()
  async def usemoji(self, ctx, given_id=None):

    if given_id == None:
      await ctx.send("Please provide an emoji_id!")
      return
    
    emoji_ID = f"<{given_id}>"

    if ctx.author.nick:     #if user has nickname
      webhook = await ctx.channel.create_webhook(name=ctx.author.nick)
      await webhook.send(str(emoji_ID), username=ctx.author.nick, avatar_url=ctx.author.avatar_url)
      await ctx.message.delete()
      await webhook.delete()
    
    else:
      webhook = await ctx.channel.create_webhook(name=ctx.author.name)
      await webhook.send(str(emoji_ID), username=ctx.author.name, avatar_url=ctx.author.avatar_url)
      await ctx.message.delete()
      await webhook.delete()



  @commands.command()
  async def reactemoji(self, ctx, msg_id, emoji_id):

    msg = await ctx.fetch_message(msg_id)   #get msg user wants to react to

    emoji_id = '<' + emoji_id + '>'         #complete the emoji id
    await msg.add_reaction(emoji_id)        #react
    await ctx.message.delete()                      #remove user command





def setup(client):
  client.add_cog(emoji(client))