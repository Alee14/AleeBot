/** **************************************
 *
 *   About: Command for AleeBot
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
module.exports.run = async (client, message) => {
    const Discord = require('discord.js');
    const os = require('os');
    const embed = new Discord.MessageEmbed()
        .setAuthor(`AleeBot ${require('../storage/settings.json').abVersion}`, client.user.avatarURL())
        .addField('About AleeBot', 'AleeBot is an all-in-one bot that\'s made from the Discord.JS api!')
        .addField('Contributors', 'Andrew Lee (Founder of this project)\nOfficialRain (Raina) (Uptime Command)\njtsshieh (Command Handler)')
        .setFooter('© Copyright 2017-2020 Alee Productions, Licensed with GPL-3.0')
        .setColor('#1fd619');
    await message.channel.send({embed});
};

exports.conf = {
    aliases: [],
    guildOnly: false,
};
exports.help = {
    name: 'about',
    description: 'About the bot.',
    usage: 'about',
    category: '- Information Commands',
};
