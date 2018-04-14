/****************************************
 * 
 *   UserInfo: Command for AleeBot
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
   var embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription("User Information")
  .addField("Names", "Username: " + message.author.username + "\nCurrent Nickname: " + message.member.displayName)
  .addField("Identity", "User ID: " + message.author.id + "")
  .addField("Create and Join Times", "Created account at: " + message.member.user.createdAt.toUTCString() + "\nJoined server at: " + message.member.joinedAt.toUTCString())
  .setColor('#1fd619')
   message.channel.send({embed});

  };
  
  exports.conf = {
    aliases: ['uinfo'],
    guildOnly: false,
  };
  exports.help = {
    name: 'userinfo',
    description: 'Tells your info.',
    usage: 'userinfo',
    category: '- Info Commands',
  };
  