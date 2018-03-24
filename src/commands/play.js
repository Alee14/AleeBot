module.exports.run = async (client, message, args) => {
if (!args[0]) return await message.channel.createMessage('A name of the song of a link is needed.');
if (!message.member.voiceState.channelID) return await message.channel.createMessage('You are not in a voice channel');
const YouTube = require('simple-youtube-api');
const moment = require('moment');
const youtube = new YouTube(process.env.GOOGLE);
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
async function YTVideo(video) {
  if (video.durationSeconds === 0) {
    return message.channel.createMessage('Live streams are not available');
  }
  const d = moment.duration({
    s: video.durationSeconds
  });

  const server = bot.MusicVariables(message.member.guild.id);
  const time = moment().startOf('day').add(d).format('HH:mm:ss');
  server.queue.push({
    url: video.url,
    title: video.title,
    thumbnail: video.thumbnails.high.url,
    duration: video.durationSeconds,
    requested: message.author.mention,
    playing: false
  });
  const embed = new bot.RichEmbed()
    .setTitle('A song has been queued')
    .setAuthor(video.title, video.thumbnails.high.url)
    .setColor(0x00afff)
    .setTimestamp()
    .addField('Title', video.title)
    .addField('Link', video.url)
    .addField('Duration', time)
    .setThumbnail(video.thumbnails.high.url)
    .setFootor('Beat Music Player');
  await message.channel.createMessage({embed});
  if (!bot.voiceConnections.get(message.member.guild.id))
    bot.joinVoiceChannel(message.member.voiceState.channelID).then(function(connection) {
      //Pass the song into the music handler
      bot.playYT(connection, message);
    });
  return null;
}};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'play',
  description: 'Plays music',
  usage: 'play [args]',
  category: '- Music Commands',
};
