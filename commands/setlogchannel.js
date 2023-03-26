/** **************************************
 *
 *   SetLogChannel: Command for AleeBot
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
const guildDB = require ('../models/guild-settings')
module.exports.run = async (client, message) => {
    //This will be replaced in the future possibly
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply('It looks like that you can\'t manage this server.');
    const channel = await message.mentions.channels.first().id;
    const [ guild ] = await guildDB.findOrCreate({ where: { id: message.guild.id } } )

    if (!channel) {
        message.reply('No channel has been set, disabling the logging channel feature...');
        await guild.update({ channelId: null } );
    } else {
        await guild.update({ channelId: message.guild.id } )   ;
    }

    await message.reply(`Logging channel has been set to <#${channel}>`);
};

exports.conf = {
    aliases: [],
    guildOnly: false,
};
exports.help = {
    name: 'setlogchannel',
    description: 'Set the log channel.',
    usage: 'setlogchannel #channel',
    category: '- Moderation Commands',
};
