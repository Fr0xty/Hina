import discord
from discord.ext import commands
import os
from youtube_dl import YoutubeDL
from discord import FFmpegPCMAudio
import asyncio
from time import sleep
from discord_components import *
import math
import json

import config



class musicCommands(commands.Cog):

  def __init__(self, client):
    self.client = client

    self.is_playing = False

    self.song_queue = []
    self.YDL_OPTIONS = {'format': 'bestaudio', 'yesplaylist':'False'}
    self.FFMPEG_OPTIONS = {'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5', 'options': '-vn'}
    self.vc = ""
    self.ctx = ""


  client = commands.Bot(command_prefix = config.prefixList, case_insensitive=True, intents = discord.Intents().all())





  def search_yt(self, item):

    isYTList = False

    with YoutubeDL(self.YDL_OPTIONS) as  ydl:

        if 'youtube.com' in item and 'list' in item:                           #if it is YT playlist
          returning = []
          info = ydl.extract_info(item, download=False)

          with open('./json/test.json', 'w') as f:
            json.dump(info, f, indent=2)

          for i in info['entries']:
            
            print(info['entries']['formats'][i]['webpage_url'])
            #link = info['entries']['formats'][i]['webpage_url']
            #dur = info['entries'][i]['duration']


            #minute = math.trunc(dur / 60)
            #second = int(((dur / 60) % 1) * 60)
            minute = 0
            second = 0
            #returning.append({'source': info['entries']['formats'][i]['url'], 'title': info['title'], 'vid_url': link, 'duration': f"{minute}m {second}s"})

          isYTList = True
          return returning
        
        elif 'youtube.com/watch?' in item or 'youtu.be' in item:            #test if is YT link
          info = ydl.extract_info(item, download=False)
          link = item
          dur = info['duration']

        else:                                                                  #search on yt because its not of the above
          info = ydl.extract_info("ytsearch:%s" % item, download=False)['entries'][0]    
          link = info['webpage_url']
          dur = info['duration']
          
    if isYTList == False:
      minute = math.trunc(dur / 60)
      second = int(((dur / 60) % 1) * 60)

      return {'source': info['formats'][0]['url'], 'title': info['title'], 'vid_url': link, 'duration': f"{minute}m {second}s"}   





  def play_next(self):
    self.song_queue.pop(0)

    if len(self.song_queue) > 0:
      self.is_playing = True

      m_url = self.song_queue[0][0]['source']

      np_title = self.song_queue[0][0]['title']
      np_url = self.song_queue[0][0]['vid_url']
      npEmbed = discord.Embed(title = 'Now Playing', description = f"[{np_title}]({np_url})", colour = config.hina_color)
      #self.ctx.send(embed = npEmbed)

      self.vc.play(discord.FFmpegPCMAudio(m_url, **self.FFMPEG_OPTIONS), after = lambda e: self.play_next())

    else:       #no more songs
      self.song_queue = []
      #self.ctx.send('This is the end of queue!')
      
      
      


  async def play_music(self, voice_client):

    if len(self.song_queue) > 0:
      self.is_playing = True

      m_url = self.song_queue[0][0]['source']

      if self.vc == "" or not self.vc.is_connected():     #bot not connected
        try:
          self.vc = await self.song_queue[0][1].connect()
        
        except:
          self.vc = voice_client
          await voice_client.move_to(self.song_queue[0][1])
          
      
      try:
        self.vc.play(discord.FFmpegPCMAudio(m_url, **self.FFMPEG_OPTIONS), after = lambda e: self.play_next())

        np_title = self.song_queue[0][0]['title']
        np_url = self.song_queue[0][0]['vid_url']
        npEmbed = discord.Embed(title = 'Now Playing', description = f"[{np_title}]({np_url})", colour = config.hina_color)
        await self.ctx.send(embed = npEmbed)
      except:
        return

    else:
      self.is_playing = False





  @commands.command()
  async def play(self, ctx, *args):

    auth_channel = ctx.author.voice.channel
    voice_client = discord.utils.get(self.client.voice_clients, guild=ctx.guild)
    self.ctx = ctx


    query = " ".join(args)

    song = self.search_yt(query)

    if type(song) == type(True) or song == 'failed':  #failed
      await ctx.send("""```Could not download the song. Incorrect format try another keyword. This could be due to playlist or a livestream.```""")

      await ctx.send("""```yaml
Creator note:
YT playist and spotify support are under development so please be patient!
      ```""")

    #elif type(song) == list:                        #downloaded playlist
      #for s in song:
        #self.song_queue.append([s, auth_channel])


    else:
      self.song_queue.append([song, auth_channel])
      await ctx.message.add_reaction('✅')

      try:
        await self.play_music(voice_client)
      except:
        return





  @commands.command()
  async def join(self, ctx):

    try:
      auth_channel = ctx.message.author.voice.channel
      voice = discord.utils.get(ctx.guild.voice_channels, name=auth_channel.name)
      voice_client = discord.utils.get(self.client.voice_clients, guild=ctx.guild)
      await ctx.message.add_reaction('✅')                           #assure user command is executed


      if voice_client == None:      #if not connected, connect
        await voice.connect()

      else:                          #if connected, move to new channel
        await voice_client.move_to(auth_channel)


    except:                           #if failed
      await ctx.reply("Please connect to a voice channel!") #author not connected to a channel

      



  @commands.command()
  async def leave(self, ctx):

    try:
      voice_client = discord.utils.get(self.client.voice_clients, guild=ctx.guild)

      await voice_client.disconnect()
      await ctx.message.add_reaction('✅')                           #assure user command is executed


    except:                           #if failed
      await ctx.reply("I'm not in a voice channel!")  #bot is not connected to a channel





  @commands.command()
  async def pause(self, ctx):

    voice = discord.utils.get(self.client.voice_clients, guild = ctx.guild)

    if not(voice == None):                        #if is connected to a channel

      if voice.is_playing():
        voice.pause()
        await ctx.message.add_reaction('✅')                           #assure user command is executed

      else:
        await ctx.reply("No music is playing!")                         #not playing music
    
    else:                                           #not in a channel
      await ctx.reply("I'm not in a voice channel!")





  @commands.command()
  async def resume(self, ctx):

    voice = discord.utils.get(self.client.voice_clients, guild = ctx.guild)

    if not(voice == None):                        #if is connected to a channel

      if not voice.is_playing():
        voice.resume()
        await ctx.message.add_reaction('✅')                           #assure user command is executed

      else:
        await ctx.reply("No music is playing!")                         #not playing music
    
    else:                                           #not in a channel
      await ctx.reply("I'm not in a voice channel!")





  @commands.command(aliases=['q'])
  async def queue(self, ctx):

    if len(self.song_queue) > 0:    #if there is song in queue

      #for now playing description
      np_title = self.song_queue[0][0]['title']       
      np_url = self.song_queue[0][0]['vid_url']
      np_dur = self.song_queue[0][0]['duration']

      now_playing = f'**NOW PLAYING** \n [{np_title}]({np_url})   {np_dur} \n'      #store into variable
      queue = []                        #to store our pages of queue
      var = ''                          #RAM for page info
      s = 0                             #indicate how many songs the page is currently have


      current_page = 0
      pages = math.ceil(len(self.song_queue) / 12)       #calculate how many pages are needed if 1 page can fit 12 songs
        

      i = 1
      while i < len(self.song_queue):              #generated song list // will stop at number of songs in queue
        title = self.song_queue[i][0]['title']
        url = self.song_queue[i][0]['vid_url']
        dur = self.song_queue[i][0]['duration']

        s += 1
        var += f'{i+1}. [{title}]({url})   {dur} \n'
        if s == 12:
          queue.append(var)
          var = ''
          s = 0
        i += 1

      if var != '':
        queue.append(var)

      if queue == []:                            #if no song is in second slot                                   
        queue.append('There is no more song in queue...') 

      

      qEmbed = discord.Embed(
        title = 'Music Queue',
        description = now_playing,
        colour = config.hina_color
      )
      try:        #if author has a nick in guild, use nick
        qEmbed.set_author(name = 'Requested by: ' + ctx.message.author.nick, icon_url = ctx.message.author.avatar_url)
      except:     #if author doesn't have a nick, use username
        qEmbed.set_author(name = 'Requested by: ' + ctx.message.author.name, icon_url = ctx.message.author.avatar_url)
        

      qEmbed.set_footer(text = f'Music queue for {ctx.guild.name}  |  Page {current_page + 1}/{pages}')
      qEmbed.add_field(name = 'Queue:', value = queue[current_page], inline = False)



      #paginator shit----------------------------------------------------------------------------------------------------
      m = await ctx.send(embed = qEmbed,
        components = [
          [Button(style=ButtonStyle.blue, label='First Page'), Button(style=ButtonStyle.grey, label='Previous Page'), Button(style=ButtonStyle.grey, label='Next Page'), Button(style=ButtonStyle.blue, label='Last Page')]
        ])

      timeout = False

      while timeout == False:

        try:
          interaction = await self.client.wait_for("button_click", timeout = 60)
          req = interaction.component.label


          if req == 'First Page' and current_page != 0:
            current_page = 0
            qEmbed.set_footer(text = f'Music queue for {ctx.guild.name}  |  Page {current_page + 1}/{pages}')
            qEmbed.remove_field(0)
            qEmbed.add_field(name = 'Queue:', value = queue[current_page], inline = False)

            await m.edit(embed = qEmbed)
            await interaction.defer(edit_origin=True)


          elif req == 'Previous Page' and current_page != 0:
            current_page -= 1
            qEmbed.set_footer(text = f'Music queue for {ctx.guild.name}  |  Page {current_page + 1}/{pages}')
            qEmbed.remove_field(0)
            qEmbed.add_field(name = 'Queue:', value = queue[current_page], inline = False)

            await m.edit(embed = qEmbed)
            await interaction.defer(edit_origin=True)


          elif req == 'Next Page' and current_page + 1 != pages:
            current_page += 1
            qEmbed.set_footer(text = f'Music queue for {ctx.guild.name}  |  Page {current_page + 1}/{pages}')
            qEmbed.remove_field(0)
            qEmbed.add_field(name = 'Queue:', value = queue[current_page], inline = False)

            await interaction.edit(embed = qEmbed)
            await interaction.defer(edit_origin=True)
            

          if req == 'Last Page' and current_page + 1 != pages:
            current_page = pages - 1
            qEmbed.set_footer(text = f'Music queue for {ctx.guild.name}  |  Page {current_page + 1}/{pages}')
            qEmbed.remove_field(0)
            qEmbed.add_field(name = 'Queue:', value = queue[current_page], inline = False)

            await m.edit(embed = qEmbed)
            await interaction.defer(edit_origin=True)
            

        except Exception:
          await m.edit('Timed Out', components = [],)
          timeout = True

    else:     #no music in queue
      await ctx.send("No music in queue")



  

  @commands.command()
  async def skip(self, ctx):
    self.is_playing = False
    self.play_next()





  @commands.command()
  async def stop(self, ctx):

    voice = discord.utils.get(self.client.voice_clients, guild = ctx.guild)

    if not(voice == None):                        #if is connected to a channel

      if voice.is_playing():
        voice.stop()
        await ctx.message.add_reaction('✅')                           #assure user command is executed

      else:
        await ctx.reply("No music is playing!")                         #not playing music
    
    else:                                           #not in a channel
      await ctx.reply("I'm not in a voice channel!")





  @commands.command()
  async def clear(self, ctx):
    voice = discord.utils.get(self.client.voice_clients, guild = ctx.guild)
    self.song_queue = []
    voice.stop()



  

  @commands.command()
  async def np(self, ctx):

    if len(self.song_queue) > 0:    #if there is song in queue
      np_title = self.song_queue[0][0]['title']       
      np_url = self.song_queue[0][0]['vid_url']
      np_dur = self.song_queue[0][0]['duration']

      now_playing = f'[{np_title}]({np_url})   {np_dur} \n'      #store into variable
      
      npEmbed = discord.Embed(
          title = 'Now Playing',
          description = now_playing,
          colour = config.hina_color
        )

      await ctx.send(embed = npEmbed)
      await ctx.send(player.position)

    else:     #no music in queue
      await ctx.send("No music in queue")





def setup(client):
  client.add_cog(musicCommands(client))