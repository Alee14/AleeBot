/** **************************************
 *
 *   Play: Command for AleeBot
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

module.exports.run = async (client, message, args, ops) => {
	const ytdl = require('ytdl-core');

	if (!message.member.voiceChannel) return message.reply('Please connect to a voice channel...');

	if (!args[0]) return message.reply('Please input a url.');

	const vaildate = await ytdl.validateURL(args[0]);

	if (!vaildate) return message.reply('Please input a **valid** url.');

	const info = await ytdl.getInfo(args[0]);

	const data = ops.active.get(message.guild.id) || {};

	if (!data.connection) data.connection = await message.member.voiceChannel.join();
	if (!data.queue) data.queue = [];
	data.guildID = message.guild.id;

	data.queue.push({
		songTitle: info.title,
		requester: message.author.tag,
		url: args[0],
		announceChannel: message.channel.id,
	});
	if (!data.dispatcher) play(client, ops, data);
	else {
		const {MessageEmbed} = require('discord.js');
		const embed = new MessageEmbed()
			.setTitle('This music has been added to the queue!')
			.setAuthor(info.title, client.user.avatarURL())
			.setColor(0x00afff)
			.setTimestamp()
			.addField('Title', info.title)
			.addField('Requested by:', message.author.tag)
			.setFooter('AleeBot Music Player');

		message.channel.send({embed});
	}

	ops.active.set(message.guild.id, data);
};

async function play(client, ops, data) {
	const ytdl = require('ytdl-core');
	const {MessageEmbed} = require('discord.js');
	const embed = new MessageEmbed()
		.setTitle('Now playing!')
		.setAuthor(data.queue[0].songTitle, client.user.avatarURL())
		.setColor(0x00afff)
		.setTimestamp()
		.addField('Title', data.queue[0].songTitle)
		.addField('Requested by:', data.queue[0].requester)
	// .addField('Link', info.url)
	// .addField('Duration', time)
		.setFooter('AleeBot Music Player');

	client.channels.get(data.queue[0].announceChannel).send({embed});

	data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
	data.dispatcher.guildID = data.guildID;

	data.dispatcher.once('finish', function() {
		finish(client, ops, this);
	});
}

function finish(client, ops, dispatcher) {
	const fetched = ops.active.get(dispatcher.guildID);

	fetched.queue.shift();

	if (fetched.queue.length > 0) {
		ops.active.set(dispatcher.guildID, fetched);

		play(client, ops, fetched);
	} else {
		ops.active.delete(dispatcher.guildID);

		const vc = client.guild.get(dispatcher.guildID).me.voiceChannel;

		if (vc) vc.leave();
	}
}

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'play',
	description: 'Plays music.',
	usage: 'play [url]',
	category: '- Music Commands',
};
