/** **************************************
 *
 *   Buy: Command for AleeBot
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
/*
const Discord = require('discord.js');
const fs = require('fs')
const db = require('quick.db');
const items = JSON.parse(fs.readFileSync('./storage/items.json', 'utf8'));

    let categories = [];

    if (!args.join(" ")) {


        for (var i in items) {


            if (!categories.includes(items[i].type)) {
                categories.push(items[i].type)
            }

        }


        const embed = new Discord.RichEmbed()
            .setDescription(`Available Items`)
            .setColor('#1fd619')

        for (var i = 0; i < categories.length; i++) {

            var tempDesc = '';

            for (var c in items) {
                if (categories[i] === items[c].type) {

                    tempDesc += `${items[c].name} - ${items[c].price}$ - ${items[c].desc}\n`;

                }

            }

            embed.addField(categories[i], tempDesc);

        }


        return message.channel.send({
            embed
        });


    }

    let itemName = '';
    let itemPrice = 0;
    let itemDesc = '';

    for (var i in items) {
        if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) {
            itemName = items[i].name;
            itemPrice = items[i].price;
            itemDesc = items[i].desc;
        }
    }


    if (itemName === '') {
        return message.channel.send(`Item ${args.join(" ").trim()} not found.`)
    }

    let selfBalance = await db.fetch(`userBalance_${message.author.id}`);

    if (selfBalance === null) {
        db.set(`userBalance_${message.author.id}`, 0);
        selfBalance = 0
    }

    if (itemPrice > selfBalance) return message.reply('You don\'t have enough money for this item.')

        db.subtract(`userBalance_${message.author.id}`, itemPrice);

        if (itemName === 'Programmer Role') {
            message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Programmers"));
        }

        message.channel.send('You bought ' + itemName + '!');
    */
  message.reply('Command is broken for now');
};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'buy',
  description: 'Buy things.',
  usage: 'buy [item]',
  category: '- Economy Commands',
};
