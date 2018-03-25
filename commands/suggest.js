/********************************
 * 
 * Suggest: Command for AleeBot
 * 
 * Copyright (c) 2018 AleeCorp
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
    if (message.guild.id != '243022206437687296') return message.reply ('This is a ACN exclusive command.');
    const { RichEmbed } = require('discord.js');
    client.channels.find('id', '427495678390960148').send(
        new RichEmbed()
          .setColor ('#1fd619')
          .setTitle('Suggestion')
          .setDescription(`This is a suggestion from `+ message.author.username +` please react to it using the following emojis.`)
          .addField('Suggestion Contents', args.join(' '))
      ).then(message => {
        message.react('\u2705');
        message.react('\u274E');
      });
    message.reply("Alright, your suggestion has been shown now.")
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: true,
  };
  exports.help = {
    name: 'suggest',
    description: 'Suggest things in AleeBot.',
    usage: 'suggest [suggestion]',
    category: '- Exclusive Commands',
  };
  