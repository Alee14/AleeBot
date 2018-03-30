/** **************************************
 *
 *   Slots: Command for AleeBot
 *   Copyright (C) 2018 AleeCorp & jtsshieh + PokeWorld
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
    const slotNumbers = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ];

    economy.fetchBalance(message.author.id + message.guild.id).then((i) => {
        if (i.money <= 10) {

            return message.channel.send(`You don't have enough money (10) to play this game.`);
        }
  
    const number1 = slotNumbers[Math.floor(Math.random() * slotNumbers.length)];
    const number2 = slotNumbers[Math.floor(Math.random() * slotNumbers.length)];
    const number3 = slotNumbers[Math.floor(Math.random() * slotNumbers.length)];
  
  
    if (number2 == number1 + 1  && number3 == number2 + 1) {
        economy.updateBalance(message.author.id + message.guild.id, parseInt(1000)).then((i) => {
            economy.fetchBalance(message.author.id + message.guild.id).then((i) => {
            message.channel.send('You won 1000 money!\nCurrent Balance: ' + i.money + ' \n> ' + emojify(number1, number2, number3));
            });
        });
    }
    else if (number2 == number3 - 1 && number1 == number2 - 1) {
        economy.updateBalance(message.author.id + message.guild.id, parseInt(1050)).then((i) => {
            economy.fetchBalance(message.author.id + message.guild.id).then((i) => {
            message.channel.send('You won 1050 money!\nCurrent Balance: ' + i.money + ' \n> ' + emojify(number1, number2, number3));
            });
        });
    }
    else {
        economy.updateBalance(message.author.id + message.guild.id, parseInt(-10)).then((i) => {
            economy.fetchBalance(message.author.id + message.guild.id).then((i) => {
            message.channel.send('You lost 10 money...\nCurrent Balance: ' + i.money + ' \n> ' + emojify(number1, number2, number3));
            });
        });
    }
  });
  
  function emojify(number1, number2, number3) {
    return emote(number1) + ' ' + emote(number2) + ' ' + emote(number3);
  }
  
  function emote(number) {
    if (number == 1) return ':one:';
    if (number == 2) return ':two:';
    if (number == 3) return ':three:';
    if (number == 4) return ':four:';
    if (number == 5) return ':five:';
    if (number == 6) return ':six:';
    if (number == 7) return ':seven:';
    if (number == 8) return ':eight:';
    if (number == 9) return ':nine:';
  }
}
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  
  exports.help = {
    name: 'slots',
    description: 'Develop a gambling addiction by playing Slots!',
    usage: 'slots',
    category: '- Economy Commands',
  };
