/** **************************************
 *
 *   Balance: Command for AleeBot
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
	const db = require('quick.db');
	const {MessageEmbed} = require('discord.js');

	const user = message.mentions.users.first() || message.author;

	let balance = await db.fetch(`userBalance_${user.id}`);

	if (balance === null) {
		db.set(`userBalance_${message.author.id}`, 0);
		balance = 0;
	}
	const embed = new MessageEmbed()
		.setDescription('**AleeCorp Bank**')
		.addField('Account Holder: ', user.username, true)
		.addField('Account Balance: ', balance, true)
		.setColor('#1fd619');

	message.channel.send({embed});
};

exports.conf = {
	aliases: ['bal', 'money'],
	guildOnly: false,
};
exports.help = {
	name: 'balance',
	description: 'Checks the balance of AleeBot',
	usage: 'balance [@someone (optional)]',
	category: '- Economy Commands',
};
