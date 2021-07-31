/** **************************************
 *
 *   ServerInfo: Command for AleeBot
 *   Copyright (C) 2017-2021 Alee Productions
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
    const listedChannels = [];
    let memberCountNoBots = await message.guild.members.fetch().then((members) => members.filter(member => !member.user.bot).size);
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}`, `${message.guild.iconURL()}`)
        .setDescription('Server Information')
        .setThumbnail(`${message.guild.iconURL()}`)
        .addField('Server Name:', `${message.guild.name}`)
        .addField('Server ID:', `${message.guild.id}`)
        .addField('Create At:', `${message.guild.createdAt.toUTCString()}`)
        /*message.guild.channels.cacheType.forEach(channel => {
            listedChannels.push(channel)
        })*/
        //.addField('Channels', `${listedChannels.join('\n')}`)
        //.addField('Total Channels', message.guild.channelCountMode)
        .addField('Total Members (with bots)', `${message.guild.memberCount}`)
        .addField('Total Members (without bots)', `${memberCountNoBots}`)
        .setColor('#1fd619');
    await message.channel.send({embeds: [embed]});
};

exports.conf = {
    aliases: ['sinfo'],
    guildOnly: false,
};
exports.help = {
    name: 'serverinfo',
    description: 'Tells your info.',
    usage: 'serverinfo',
    category: '- Information Commands',
};
