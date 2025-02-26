/** **************************************
 *
 *   AleeBot: Made for discord servers
 *   Copyright (C) 2017-2025 Andrew Lee Projects
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
require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client({
	allowedMentions: {
		parse: ['users', 'roles'],
		repliedUser: true
	},
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS']
});
const moment = require('moment');
const fs = require('fs');
const readline = require('readline');
const colors = require('colors');
//const i18next = require('i18next');
const settings = require('./storage/settings.json');
const { activity } = require('./storage/activities');
const apiServer = require("./api/server");
const active = new Map();
let autoRole = true;
let readyEmbedMessage = true;

const { guildSettings } = require('./models/guild-settings');

const ownerID = '242775871059001344';
//let logChannel = '318874545593384970';
let statusChannelID = '606602551634296968';
let serverWhitelist = "243022206437687296";
let roleWhitelist = "657426918416580614";

const log = (message) => {
	console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`.white);
};

function botPresence() {
	client.user.setPresence({
		activities: [{
			name: activity[Math.floor(Math.random() * activity.length)]
		}],
		status: 'online',
		afk: false,
	});
	log(`[>] Updated bot presence to "${client.user.presence.activities[0].name}"`.green);
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '> '.gray,
});

console.log(`AleeBot ${settings.abVersion}: Copyright (C) 2017-2025 Andrew Lee Projects`.gray);
console.log('This program comes with ABSOLUTELY NO WARRANTY; for details type `show w\'.'.gray);
console.log('This is free software, and you are welcome to redistribute it'.gray);
console.log('under certain conditions; type `show c\' for details.\n'.gray);

if (process.argv.indexOf('--debug') === -1) {
	console.log('Running AleeBot without --debug command line flag. Debug output disabled.\n'.yellow);
} else {
	console.log('[!] Entering debug mode...'.yellow);
	client.on('debug', function(info) {
		log(info.gray);
	});
	client.on('warn', function(info) {
		log(info.red);
	});
}

if (process.argv.indexOf('--beta') === -1) {
	client.login(process.env.abtoken).catch(function() {
		console.log('[X] Login failed. The token that you put in is invalid, please put in a new one...'.red);
		process.exit(0);
	});
} else {
	client.login(process.env.abbtoken).catch(function() {
		console.log('[X] Login failed. The token that you put in is invalid, please put in a new one...'.red);
		process.exit(0);
	});
}

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands', (err, files) => {
	if (err) console.error(err);
	log(`[!] Attempting to load a total of ${files.length} commands into the memory.`.cyan);
	files.forEach((file) => {
		try {
			const command = require(`./commands/${file}`);
			log(`[!] Attempting to load the command "${command.help.name}".`.cyan);
			client.commands.set(command.help.name, command);
			command.conf.aliases.forEach((alias) => {
				client.aliases.set(alias, command.help.name);
				log(`[!] Attempting to load "${alias}" as an alias for "${command.help.name}"`.cyan);
			});
		} catch (err) {
			log('[X] An error has occurred trying to load a command. Here is the error.'.red);
			console.log(err.stack);
		}
	});
	log('[>] Command loading complete!\n'.green);
});

rl.on('line', function(cmd) {
	const args = cmd.split(' ');
	switch (args[0]) {
	case 'guilds':
		if (client.guilds.size === 0) {
			console.log(('[!] No guilds found.'.yellow));
		} else {
			console.log('[i] These are the servers that AleeBot is connected to:');
			client.guilds.cache.forEach((guild) => {
				console.log(`   Guild Name: ${guild.name} - ID: ${guild.id}`.blue);
			});
		}
		break;
	case 'leave':
		if (!args[1]) {
			console.log('[!] Please insert the guild\'s ID.'.yellow);
		} else {
			let guild = client.guilds.cache.get(args[1]);
			guild.leave().then(guild => {
				console.log(`AleeBot has left ${guild.name}`)
			});
		}
		break;
	case 'broadcast':
		if (!args[1]) {
			console.log('[!] Usage: broadcast [guildID] [channelID].'.yellow);
		} else {
			const broadcast = args.join(' ').slice(48);
			let guild = null;
			guild = client.guilds.cache.get(args[1]);
			let channel = null;
			channel = guild.channels.cache.get(args[2]);
			if (channel != null) {
				channel.send(`**[Broadcast]** ${broadcast}`);
			} else {
				console.log('[X] Broadcast cannot be blank'.red)
			}
		}
		break;
	case 'uptime':
		let uptime = parseInt(client.uptime);
		uptime = Math.floor(uptime / 1000);
		let uptimeMinutes = Math.floor(uptime / 60);
		const minutes = uptime % 60;
		let hours = 0;
		let days = 0;
		while (uptimeMinutes >= 60) {
			hours++;
			uptimeMinutes = uptimeMinutes - 60;
		}
		while (hours >= 24) {
			days++;
			hours = hours - 24;
		}
		const uptimeSeconds = minutes % 60;
		console.log(`[i] AleeBot has been up for ${days} days, ${hours} hours, ${uptimeMinutes} minutes, and ${uptimeSeconds} seconds.`);
		break;
	case 'activity':
		console.log('[i] Generating new activity'.blue);
		botPresence();
		break;
	case 'exit':
		console.log('[i] AleeBot will now exit!'.blue);
		const asyncPowerOff = async () => {
			const readyEmbed = new Discord.MessageEmbed()
				.setAuthor('AleeBot Status', client.user.avatarURL())
				.setDescription('AleeBot is now going offline...')
				.setColor('#ff3333');
				let statusChannel = client.channels.cache.get(statusChannelID);
  				if (!statusChannel) return console.error('The status channel does not exist! Skipping.');
  			await statusChannel.send(readyEmbed);
		};
		asyncPowerOff();
		client.destroy();
		process.exit(0);
		break;
	case 'help':
		let msg = ('AleeBot '+ settings.abVersion +' Console Help\n\n');
		msg += ('guilds - Shows all guilds that AleeBot\'s on.\n');
		msg += ('leave - Leaves a guild.\n');
		msg += ('broadcast - Broadcasts a message to a server.\n');
		msg += ('uptime - Shows the uptime for AleeBot.\n');
		msg += ('activity - Generates new activity\n');
		msg += ('help - Shows this command.\n');
		msg += ('exit - Exits AleeBot.\n');
		console.log(msg.cyan);
		break;
	default:
		console.log('Unknown command, type \'help\' to list the commands...'.yellow);
	}
	rl.prompt();
});

client.on('ready', async () => {
	log('[>] AleeBot is now ready!'.green);
	log(`[i] Logged in as ${client.user.tag}`.green);
	log(`[i] Default Prefix: ${settings.prefix}`.green);
	log(`[i] Bot ID: ${client.user.id}`.green);
	log(`[i] Running version ${settings.abVersion} | Serving in ${client.guilds.cache.size} guilds`.green);

	botPresence();

	apiServer(client);

	setInterval(function() {
	botPresence();
	}, 200000);
	if (readyEmbedMessage === true) {
		const readyEmbed = new Discord.MessageEmbed()
			.setAuthor('AleeBot Status', client.user.avatarURL())
			.setDescription('AleeBot has started')
			.addField('Version', settings.abVersion, true)
			.addField('Discord.JS Version', Discord.version, true)
			.addField('Prefix', `\`${settings.prefix}\``)
			.setColor('#5cd65c');
		let statusChannel = client.channels.cache.get(statusChannelID);
		if (!statusChannel) return console.error('The status channel does not exist! Skipping.');
		statusChannel.send({ embeds: [readyEmbed]});
	}
	rl.prompt();
});

client.on('guildMemberAdd', async (member) => {
	const guildSetting = await guildSettings.findOne({ where: { guildID: member.guild.id } });
	if (!guildSetting || !guildSetting.logChannelID) return;

	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot Logging', client.user.avatarURL())
		.setDescription(`A user has joined this server!`)
		.addField('Username: ', `${member.user.tag}`, true)
		.addField('User ID: ', `${member.id}`, true)
		.addField('Created At: ', `${member.user.createdAt.toUTCString()}`)
		.setColor('#4bff31')
		.setTimestamp();

	let guildMember = client.channels.cache.get(guildSetting.logChannelID);
	if (!guildMember) return;

	guildMember.send({ embeds: [logEmbed]});
	if (autoRole === true) {
		if (member.guild.id !== serverWhitelist) return;
		const role = member.guild.roles.cache.get(roleWhitelist);
		member.roles.add(role);
		log(`[i] ${member.user.username} joined Andrew Lee Projects, automatically giving them role.`.green);
	}
});

client.on('guildMemberRemove', async (member) => {
	const guildSetting = await guildSettings.findOne({ where: { guildID: member.guild.id } });
	if (!guildSetting || !guildSetting.logChannelID) return;

	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot Logging', client.user.avatarURL())
		.setDescription(`A user has left this server!`)
		.addField('Username: ', `${member.user.tag}`, true)
		.addField('User ID: ', `${member.id}`, true)
		.setColor('#ec2727')
		.setTimestamp();

	let guildMember = client.channels.cache.get(guildSetting.logChannelID);
	if (!guildMember) return;

	guildMember.send({ embeds: [logEmbed]});
})


client.on('messageUpdate', async (oldMessage, newMessage) => {
	const guildSetting = await guildSettings.findOne({ where: { guildID: oldMessage.guild.id } });
	if (!oldMessage.guild || !guildSetting || !guildSetting.logChannelID) return;

	//if (!oldMessage.guild || oldMessage.guild.id !== serverWhitelist) return;
	if (oldMessage.content === newMessage.content) {
		return;
	}
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot Logging', client.user.avatarURL())
		.setDescription(`A message from ${oldMessage.author.username} was edited in <#${oldMessage.channel.id}>`)
		.addField('Before: ', `\`\`\`${oldMessage.content}\`\`\``)
		.addField('After: ', `\`\`\`${newMessage.content}\`\`\``)
		.setColor('#ffff1a')
		.setTimestamp()
		.setFooter(`Author ID: ${oldMessage.author.id}`);

	let editMessage = client.channels.cache.get(guildSetting.logChannelID);
	if (!editMessage) return;

	editMessage.send({ embeds: [logEmbed]});
});

client.on('messageDelete', async (message) => {
	if (!message.content) return;

	const guildSetting = await guildSettings.findOne({ where: { guildID: message.guild.id } });
	if (!guildSetting || !guildSetting.logChannelID) return;

	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot Logging', client.user.avatarURL())
		.setDescription(`A message from ${message.author.username} was deleted in <#${message.channel.id}>`)
		.addField('Deleted Message: ', `\`\`\`${message.content}\`\`\``)
		.setColor('#ff021b')
		.setTimestamp()
		.setFooter(`Author ID: ${message.author.id}`);

	let deleteMessage = client.channels.cache.get(guildSetting.logChannelID);
	if (!deleteMessage) return;

	deleteMessage.send({ embeds: [logEmbed]});
});

// client.on('guildBanAdd', async (guild, user) => {
// 	const guildSetting = await guildSettings.findOne({ where: { guildID: guild.id } });
// 	if (!guildSetting || !guildSetting.logChannelID) return;
//
// 	const logEmbed = new Discord.MessageEmbed()
// 		.setAuthor('AleeBot Logging', client.user.avatarURL())
// 		.setDescription(`This user got banned from ${guild.name}`)
// 		.addField('User:', `${user.tag}`)
// 		.addField('User ID:', `${user.id}`)
// 		.setColor('#ff021b')
// 		.setTimestamp();
//
// 	let banMessage = client.channels.cache.get(guildSetting.logChannelID);
// 	if (!banMessage) return;
//
// 	banMessage.send({ embeds: [logEmbed]});
// });
//
// client.on('guildBanRemove', async (guild, user) => {
// 	const guildSetting = await guildSettings.findOne({ where: { guildID: guild.id } });
// 	if (!guildSetting || !guildSetting.logChannelID) return;
//
// 	const logEmbed = new Discord.MessageEmbed()
// 		.setAuthor('AleeBot Logging', client.user.avatarURL())
// 		.setDescription(`This user got unbanned from ${guild.name}`)
// 		.addField('User:', `${user.tag}`)
// 		.addField('User ID:', `${user.id}`)
// 		.setColor('#ff021b')
// 		.setTimestamp();
//
// 	let banMessage = client.channels.cache.get(guildSetting.logChannelID);
// 	if (!banMessage) return;
//
// 	banMessage.send({ embeds: [logEmbed]});
// });

client.on('guildCreate', (guild) => {
	log(`[i] New guild joined: ${guild.name} (${guild.id}). This guild has ${guild.memberCount} members!`.blue);
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot', client.user.avatarURL())
		.setDescription('I got added to a server!')
		.addField('Server Name:', `${guild.name}`, true)
		.addField('Server ID:', `${guild.id}`, true)
		.addField('Members', `${guild.memberCount}`, true)
		.setColor('#5cd65c')
		.setFooter(`We now run on ${client.guilds.cache.size} guilds.`);

	let statusChannel = client.channels.cache.get(statusChannelID);
	if (!statusChannel) return;
	statusChannel.send({ embeds: [logEmbed]});
});


client.on('guildDelete', (guild) => {
	log(`[i] I have been removed from: ${guild.name} (${guild.id})`.red);
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot', client.user.avatarURL())
		.setDescription('I got removed from a server...')
		.addField('Server Name:', `${guild.name}`, true)
		.addField('Server ID:', `${guild.id}`, true)
		.setColor('#ff021b')
		.setFooter(`We now run on ${client.guilds.cache.size} guilds.`);

	let statusChannel = client.channels.cache.get(statusChannelID);
	if (!statusChannel) return;
	statusChannel.send({ embeds: [logEmbed]});
});
/*
client.on("messageReactionAdd", async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}

	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});
*/
client.on('messageCreate', async(msg) => {
	if (!client.application?.owner) await client.application?.fetch();
	if (msg.author.bot) return;
	if (!msg.guild) return;

	const prefixes = JSON.parse(fs.readFileSync('./storage/prefixes.json', 'utf8'));

	if (!prefixes[msg.guild.id]) {
		prefixes[msg.guild.id] = {
			prefixes: settings.prefix,
		};
	}

	const prefix = prefixes[msg.guild.id].prefixes;


	if (!msg.content.startsWith(prefix)) return;
	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift();
	let cmd;

	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
		cmd = client.commands.get(client.aliases.get(command));
	}

	if (cmd) {
		if (cmd.conf.guildOnly === true) {
			if (!msg.channel.guild) {
				return msg.channel.send('This command can only be ran in a guild.');
			}
		}
		try {
			const ops = {
				ownerID: ownerID,
				active: active,
				autoRole: autoRole,
			};

			cmd.run(client, msg, args, ops);
		} catch (e) {
			console.error(e);
		}
	}
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

process.on('unhandledRejection', function(err, p) {
	log('[X | UNCAUGHT PROMISE] ' + err.stack.red);
});

client.on('reconnecting', function() {
	log('[!] AleeBot has disconnected from Discord and is now attempting to reconnect.'.yellow);
});

client.on('disconnect', function() {
	log('[X] AleeBot has disconnected from Discord and will not attempt to reconnect.'.red);
	console.log('At this point, you\'ll need to restart AleeBot.'.red);
	process.exit(0);
});
