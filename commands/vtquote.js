/****************************************
 * 
 *   VTQuote: Command for AleeBot
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
    
    let VictorQuote;
    
      function GetVictorQuote(quoteNum = -1) {
        VictorQuote = new Discord.RichEmbed();
      
        let quo = require('../storage/vtquotes.json').quotes
    
        if (quoteNum == -1) {
          quoteNum = Math.floor(Math.random() * 1000) % quo.length;
          quo=quo[quoteNum];
        }
    
        const author = quo.author;
        const authorImage = quo.authorImage;
        const quote = quo.quote;
        const year = quo.year;
        const url = quo.url;
    
        VictorQuote.setAuthor(author, authorImage);
        VictorQuote.setColor('#1fd619');
        VictorQuote.setDescription(quote);
        VictorQuote.setFooter('- ' + year);
        VictorQuote.setURL(url);
    
        return VictorQuote;
      }
    
        const victorquote = GetVictorQuote();
        message.reply('Alright, here\'s your Victor quote.')
        message.channel.send(victorquote);
    };
    
    exports.conf = {
        aliases: [],
        guildOnly: false,
      };
      exports.help = {
        name: 'vtquote',
        description: 'Tells you quotes when victor accidentaly swore.',
        usage: 'vtquote',
        category: '- Quote Commands',
      };
      