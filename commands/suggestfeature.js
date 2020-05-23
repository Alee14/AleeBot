/****************************************
 * 
 *   SuggestFeature: Command for AleeBot
 *   Copyright (C) 2017-2020 Alee Productions
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
        const { RichEmbed } = require('discord.js');
        
        client.channels.find('id', '427495678390960148').send(
            new RichEmbed()
            .setColor ('#1fd619')
            .setTitle('AleeBot Feature Suggestion')
            .setDescription(`This is an AleeBot feature suggestion from `+ message.author.username +` sending from ${message.guild.name}.`)
            .addField('Suggestion Contents', args.join(' '))
         )
       await message.reply("Your suggestion has been shown to the ALP discord server!")
   
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
  
