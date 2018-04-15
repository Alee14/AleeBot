/****************************************
 * 
 *   Info: Command for AleeBot
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
    const os = require('os');
    const embed = new Discord.RichEmbed()
      .setTitle('Information on AleeBot\'s Host')
      .addField('OS Hostname: ', os.hostname() , true)
      .addField('NodeJS Version: ', process.versions.node , true)
      .addField('OS Platform: ', os.platform() , true)
      .addField('OS Version: ', os.release() , true)
      .setColor('#1fd619');
    message.channel.send({embed});
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'info',
    description: 'Tells you information about the bot',
    usage: 'info',
    category: '- General Commands',
  };
  