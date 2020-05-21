/****************************************
 * 
 *   Interrogate: Command for AleeBot
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
    if (message.guild.id != '243022206437687296') return message.reply ('This is a ALP exclusive command.');

    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('It looks like that you don\'t have the permissions to jail members.');
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Uhh... I don\'t have permission to jail members.');

    const member = message.mentions.members.first();
    if (!member) return await message.reply('Uhh... Please mention a member first.');

    member.addRole(message.guild.roles.find('name', 'Interrogation'));
    message.reply(`Alright, I just interrogated ${member.user.tag}.`)
};

exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'interrogate',
    description: 'Interrogates a member',
    usage: 'interrogate [user]',
    category: '- ALP Exclusive Commands',
  };
  