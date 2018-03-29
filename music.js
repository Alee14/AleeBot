/********************************
 * 
 * Music: Plugin for AleeBot
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
// Created by jtsshieh#6434 in the BonGon project: https://github.com/jtsshieh/BonGon

const YTDL = require('ytdl-core');
module.exports.playYT = async (bot, connection, msg) => {
  const EventEmitter = require('events');
  class MyEmitter extends EventEmitter {}
  bot.musicEmit = new MyEmitter();

  const musicvariables = require('./music.js').MusicVariables;
  const server = musicvariables(bot, msg.member.guild.id);

  server.dispatcher = connection;

  connection.playStream(YTDL(server.queue[0].url, {
    filter: 'audioonly'
  }));

  server.nowPlaying = server.queue[0];
  server.beforeNowPlaying = server.nowPlaying;


  server.queue.shift();

  server.nowPlaying.playing = true;

  let time = 0;
  let counter = setInterval(
    function() {
      time = time + 1;
      server.dispatcher.time = time;
    }, 1000);

  bot.musicEmit.on('paused', () => {
    clearInterval(counter);
  });

  bot.musicEmit.on('resumed',() =>{
    counter = setInterval(
      function() {
        time = time + 1;
        server.dispatcher.time = time;
      }, 1000);
  });

  connection.once('end', function() {
    clearInterval(counter);

    if (server.queue[0] || server.beforeNowPlaying) {
      if (server.repeat) {
        server.queue.push(server.beforeNowPlaying);
      }

      server.nowPlaying = null;
      bot.playYT(connection, msg);
    }

    else {
      bot.leaveVoiceChannel(connection.channelID);
      bot.servers[msg.member.guild.id] = null;
    }
  });
};
module.exports.MusicVariables = (bot, guildID) => {
  if (!bot.servers[guildID]) {
    bot.servers[guildID] = {'queue' : [], 'dispatcher': null, 'repeat': false};
  }
  return bot.servers[guildID];
};
