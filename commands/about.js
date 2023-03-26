/** **************************************
 *
 *   About: Command for AleeBot
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
    const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

    let Contributors = ('- Andrew Lee (Founder of this project)\n');
    Contributors += ('- OfficialRain (Raina) (Uptime Command)\n');
    Contributors += ('- jtsshieh (Command Handler)');

    const aboutEmbed = new MessageEmbed()
        .setAuthor(`AleeBot ${require('../storage/settings.json').abVersion}`, client.user.avatarURL())
        .addField('About AleeBot', 'AleeBot is an all-in-one bot that\'s made from the Discord.JS API!')
        .addField('License', 'GNU General Public License v3.0')
        .addField('Contributors', Contributors)
        .setFooter('© Copyright 2017-2023 Andrew Lee Projects')
        .setColor('#1fd619');
    
    let inviteButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle('LINK')
            .setLabel('Invite AleeBot')
            .setURL('https://top.gg/bot/282547024547545109'),
            new MessageButton()
            .setStyle('LINK')
            .setLabel('Join Andrew Lee Projects') 
            .setURL('https://discord.gg/EFhRDqG')
        );

    await message.channel.send({embeds: [aboutEmbed], components: [inviteButton]});
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
