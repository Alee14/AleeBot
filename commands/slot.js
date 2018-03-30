/********************************
 * 
 * Slot: Command for AleeBot and imported from PokeBot
 * 
 * Copyright (c) 2018 AleeCorp & PokeWorld
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
