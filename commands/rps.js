/****************************************
 * 
 *   RockPaperScissors: Command for AleeBot
 *   Copyright (C) 2018 AleeCorp
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * *************************************/
module.exports.run = async (client, message) => {
    const economy = require('discord-eco')
    economy.fetchBalance(message.author.id + message.guild.id).then((i) => {
        if (i.money <= 50) {

            return message.channel.send(`You don't have enough money (50) to play this game.`);
        }
    });
    let rps = [
        "Rock.",
        "Paper",
        "Scissors",
      ];

    message.channel.send(rps[Math.floor(Math.random() * rps.length)]);
    message.channel.send('Please note that this feature is in **beta** so if you want to help this please do by doing `ab:git`')
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'rps',
    description: 'A rock, paper, scissors game.',
    usage: 'rps',
    category: '- Games',
  };
  