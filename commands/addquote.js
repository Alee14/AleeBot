/****************************************
 * 
 *   AddQuote: Command for AleeBot
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
module.exports.run = async (client, message, args) => {
    const moment = require('moment');
    const log = message => {
  
      console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
    
    };
      const fs = require('fs');
      if(!args[0]) return message.reply(`Usage: ab:addquote [author] [authorImage] [quote] [year]`)
  
      let quotes = JSON.parse(fs.readFileSync("./storage/quotes.json", "utf8"));
  
      quotes = {
          author: args[0],
          authorImage: args[1],
          quote: args[2],
          year: args[3]
      };
  
      fs.writeFile("./storage/quotes.json", JSON.stringify(quotes), (err) =>{
          if (err) log(err)
      })
  
      message.reply(`You just added a new quote!`);
      log(`[i] A quote has been added to quotes.json...`) 
      };
    
    exports.conf = {
      aliases: [],
      guildOnly: true,
    };
    exports.help = {
      name: 'addquote',
      description: 'Sets the guild prefix.',
      usage: 'addquote [author] [authorImage] [quote] [year]',
      category: '- General Commands',
    };
    