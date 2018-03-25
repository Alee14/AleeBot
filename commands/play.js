/********************************
 * 
 * Play: Command for AleeBot
 * 
 * Copyright (c) 2018 AleeCorp & jtsshieh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ********************************/
module.exports.run = async (client, message, args) => {
  if (!args[0]) return await message.channel.send('A name of the song of a link is needed.');
  if (!message.member.voiceChannelID) return await message.channel.send('You are not in a voice channel');
  const YouTube = require('simple-youtube-api');
  const moment = require('moment');
  const youtube = new YouTube(client.apikey);
  const url = args.join(' ').replace(/<(.+)>/g, '$1');
  if (!url) return;
  await youtube.getVideo(url)
    .then(results => {
      YTVideo(results);
    })
    .catch(() => {
      youtube.searchVideos(args.join(' '), 1)
        .then(results => {
          youtube.getVideo(results[0].url)
            .then(vid => {
              YTVideo(vid);
            });
        });
    });

  const music = require('../music.js');
  async function YTVideo(video) {
    if (video.durationSeconds === 0) {
      return message.channel.send('Live streams are not available');
    }
    const d = moment.duration({
      s: video.durationSeconds
    });

    const server = music.MusicVariables(client, message.member.guild.id);
    const time = moment().startOf('day').add(d).format('HH:mm:ss');
    server.queue.push({
      url: video.url,
      title: video.title,
      thumbnail: video.thumbnails.high.url,
      duration: video.durationSeconds,
      requested: message.author.mention,
      playing: false
    });
    const { RichEmbed } = require('discord.js');

    const embed = new RichEmbed()
      .setTitle('A song has been queued')
      .setAuthor(video.title, video.thumbnails.high.url)
      .setColor(0x00afff)
      .setTimestamp()
      .addField('Title', video.title)
      .addField('Link', video.url)
      .addField('Duration', time)
      .setThumbnail(video.thumbnails.high.url)
      .setFooter('AleeBot Music Player');
    await message.channel.send({embed});
    if (!client.voiceConnections.get(message.member.guild.id))
      message.member.voiceChannel.join().then(function(connection) {
        music.playYT(client, connection, message);
      });
    return null;
  }};

exports.conf = {
  aliases: [],
  guildOnly: true,
};
exports.help = {
  name: 'play',
  description: 'Plays music',
  usage: 'play [args]',
  category: '- Music Commands',
};
