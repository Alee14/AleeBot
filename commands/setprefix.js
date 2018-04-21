/****************************************
 * 
 *   SetPrefix: Command for AleeBot
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
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Sorry you need admin to set my prefix')
    if(!args[0] || args[0 == "help"]) return message.reply(`Usage: <your prefix>setprefix <prefix>`)

    let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./storage/prefixes.json", JSON.stringify(prefixes), (err) =>{
        if (err) log(err)
    })

    message.reply(`AleeBot's Prefix in this guild is now \`${args[0]}\``);
    log(`[i] The guild ${message.guild.name} has changed AleeBot's prefix to ${args[0]}`)
    };
  
  exports.conf = {
    aliases: [],
    guildOnly: true,
  };
  exports.help = {
    name: 'setprefix',
    description: 'Sets the guild prefix.',
    usage: 'setprefix [prefix]',
    category: '- General Commands',
  };
  