/** **************************************
 *
 *   AddQuote: Command for AleeBot
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
const mongo = require('../plugins/mongo');
const quoteSchema = require('../schema/quote-schema');
module.exports.run = async (client, message, args) => {
/*
	let authorMessage;
	let authorImageMessage;
	let quoteMessage;
	let yearMessage;*/

	if (!['242775871059001344'].includes(message.author.id)) return message.reply('**This command is disabled due to a new system being implemented.**');
	//await message.author.send('Welcome to AleeBot\'s quoting system!\nThis process will be easy.');

	if (!args.length) return message.reply("Error: Did not provide more context (message will be replaced eventually)");

	await mongo().then(async (mongoose) => {
		try {
			await new quoteSchema({
				author: args[0],
				authorImage: args[1],
				quote: args[2],
				year: args[3]

			}).save()
		} finally {
			await mongoose.connection.close();
			message.reply('Added this quote to the database...');
		}
	})

/*
	let quoteState = {};
	let state = quoteState[message.author.id];

	if (message.content.toLowerCase() === "q"){
		await message.author.send("Process has been cancelled");
		state = null;
	} else {
		switch (state) {
			case 1:
				await message.author.send('Enter the author\'s name');
				authorMessage = message.content;
				console.log(authorMessage);
				state = 2;
			break;
			case 2:
				await message.author.send('author url here');
				authorImageMessage = message.content;
				console.log(authorImageMessage);
				state = 3;
			break;
			case 3:
				await message.author.send('quote here');
				quoteMessage = message.content;
				console.log(quoteMessage);
				state = 4;
			break;
			case 4:
				await message.author.send('year here');
				yearMessage = message.content;
				console.log(yearMessage);
				state = 5;
			break;
			case 5:
				await message.author.send('process complete');
				state = null;
			break;
		}
*/
};

exports.conf = {
	aliases: [],
	guildOnly: true,
};
exports.help = {
	name: 'addquote',
	description: 'Sets the guild prefix.',
	usage: 'addquote [author] [authorImage] [quote] [year]',
	category: '- Quote Commands',
};

