/** **************************************
 *
 *   Slowdown: Command for AleeBot
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
module.exports.run = async (client, message, args) => {
	if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('It looks like that you don\'t have the permissions to slowdown channels.');
	if (isNaN(args[0])) return message.reply('Please input a valid number to slowdown a channel.');
	await message.channel.setRateLimitPerUser(args[0]);
	message.channel.send(`This channel has been slowdowned for ${args[0]} second(s).`);

};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'slowdown',
	description: 'Ratelimits channel.',
	usage: 'slowdown [number]',
	category: '- Moderation Commands',
};
