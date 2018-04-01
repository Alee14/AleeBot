/****************************************
 * 
 *   Quote: Command for AleeBot
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
const Discord = require('discord.js');

let NewQuote;

  function GetNewQuote(quoteNum = -1) {
    NewQuote = new Discord.RichEmbed();
  
    let quo = require('../storage/quotes.json').quotes

    if (quoteNum == -1) {
      quoteNum = Math.floor(Math.random() * 1000) % quo.length;
      quo=quo[quoteNum];
    }

    const author = quo.author;
    const authorImage = quo.authorImage;
    const quote = quo.quote;
    const year = quo.year;
    const url = quo.url;

    NewQuote.setAuthor(author, authorImage);
    NewQuote.setColor('#939d45');
    NewQuote.setDescription(quote);
    NewQuote.setFooter('- ' + year);
    NewQuote.setURL(url);

    return NewQuote;
  }

    const newquote = GetNewQuote();
    message.reply('Alright, here\'s your quote.')
    message.channel.send(newquote);
};

exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'quote',
    description: 'Tells you quotes',
    usage: 'quote',
    category: '- General Commands',
  };
  