/****************************************
 * 
 *   SuggestFeature: Command for AleeBot
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
const talkedRecently = new Set();
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Wait 1 minute before getting typing this again. - " + message.author);
    } else {
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
       message.reply("Alright, your suggestion has been shown to the ACN guild.")
    // Adds the user to the set so that they can't talk for a minute
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 60000);
}
   
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'suggestfeature',
    description: 'Suggest features in AleeBot.',
    usage: 'suggestfeature [suggestion]',
    category: '- General Commands',
  };
  