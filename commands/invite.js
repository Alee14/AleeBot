/** **************************************
 *
 *   Invite: Command for AleeBot
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
	message.channel.send({embed: {
		color: 2086425,
		title: 'Invite Command',
		fields: [{
			name: 'Invite AleeBot',
			value: '[Invite AleeBot to your server.](https://top.gg/bot/282547024547545109)',
		},
		{
			name: 'Join the Alee Productions Community',
			value: '[Discord Server](https://discord.gg/EFhRDqG)',
		},
		],
	},
	});

	// message.channel.send('Want AleeBot in your server? Here\'s the link: https://discordapp.com/api/oauth2/authorize?client_id=282547024547545109&permissions=2080375863&scope=bot');
};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'invite',
	description: 'Gives you an invite to the guild and the bot.',
	usage: 'invite',
	category: '- General Commands',
};

