/** **************************************
 *
 *   AleeBot: Made for discord servers
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
const Discord = require('discord.js');
const moment = require('moment');
//const Sequelize = require('sequelize');
const readline = require('readline');
const colors = require('colors');
const DBL = require('dblapi.js');
const i18next = require('i18next');
const client = new Discord.Client({
	disableEveryone: true,
});
const settings = require('./storage/settings.json');
const fs = require('fs');
const api = require('./tokens.json');
const dbl = new DBL(api.dbltoken, client);
const active = new Map();
const ownerID = '242775871059001344';
let autoRole = true;
let logChannel = '318874545593384970';
let statusChannelID = '606602551634296968';
let readyEmbedMessage = true;

const log = (message) => {
	console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`.white);
};

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '> '.gray,
});

console.log(`AleeBot ${settings.abVersion}: Copyright (C) 2017-2020 Alee Productions`.gray);
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
	client.login(api.abtoken).catch(function() {
		console.log('[X] Login failed. The token that you put in is invalid, please put in a new one...'.red);
		process.exit(0);
	});
} else {
	client.login(api.abbtoken).catch(function() {
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
	log('[>] Command Loading complete!'.green);
	console.log('\n');
});

rl.on('line', function(cmd) {
	const args = cmd.split(' ');
	switch (args[0]) {
	case 'guilds':
		if (client.guilds.size === 0) {
			console.log(('[!] No guilds found.'.yellow));
		} else {
			console.log('[i] Here\'s the servers that AleeBot is connected to:');
			for ([id, guild] of client.guilds) {
				console.log(`   Guild Name: ${guild.name} - ID: ${guild.id}`.blue);
			}
		}
		break;
	case 'channels':
		if (!args[1]) {
			console.log('[!] Please insert the guild\'s ID.'.yellow);
		} else {
			var guild = client.guilds.get(args[1]);
			console.log('[i] Here\'s the channels that this guild have:'.blue);
			for ([id, channel, guild] of guild && client.channels) {
				console.log(`   Channel: #${channel.name} - ID: ${channel.id}`.blue);
			}
		}
		break;
	case 'leave':
		if (!args[1]) {
			console.log('[!] Please insert the guild\'s ID.'.yellow);
		} else {
			var guild = client.guilds.get(args[1]);
			guild.leave();
		}
		break;
	case 'broadcast':
		if (!args[1]) {
			console.log('[!] Usage: broadcast [guildID] [channelID].'.yellow);
		} else {
			const broadcast = args.join(' ').slice(48);
			var guild = null;
			guild = client.guilds.get(args[1]);
			var channel = null;
			channel = guild.channels.get(args[2]);
			if (channel != null) {
				channel.send(broadcast);
			}
		}
		break;
	case 'uptime':
		let uptime = parseInt(client.uptime);
		uptime = Math.floor(uptime / 1000);
		let uptimeMinutes = Math.floor(uptime / 60);
		const minutes = uptime % 60;
		let hours = 0;
		while (uptimeMinutes >= 60) {
			hours++;
			uptimeMinutes = uptimeMinutes - 60;
		}
		const uptimeSeconds = minutes % 60;
		console.log(`[i] AleeBot has been up for ${hours} hours, ${uptimeMinutes} minutes, and ${uptimeSeconds} seconds.`.blue);
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
		msg += ('channels - Shows all the channels that the guilds have.\n');
		msg += ('leave - Leaves a guild.\n');
		msg += ('broadcast - Broadcasts a message to a server.\n');
		msg += ('uptime - Shows the uptime for AleeBot.\n');
		msg += ('help - Shows this command.\n');
		msg += ('exit - Exits AleeBot.\n');
		console.log(msg.cyan);
		break;
	default:
		console.log('Unknown command, type \'help\' to list the commands...'.yellow);
	}
	rl.prompt();
});
/*
const sequelizeLogging = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'logging.sqlite',
});

const Logging = sequelizeLogging.define('logging', {
	serverid: {
		type: Sequelize.INTEGER,
		unique: true,
	},
	channelid: Sequelize.INTEGER,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

const sequelizeQuote = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'quote.sqlite',
});

const Quote = sequelizeQuote.define('quote', {
	quoteid: {
		type: Sequelize.INTEGER,
		unique: true,
	},
	author: Sequelize.STRING,
	authorImage: Sequelize.STRING,
	quote: Sequelize.STRING,
	year: Sequelize.INTEGER
});

*/

client.on('ready', () => {
	log('[>] AleeBot is now ready!'.green);
	log(`[i] Logged in as ${client.user.tag}`.green);
	log(`[i] Default Prefix: ${settings.prefix}`.green);
	log(`[i] Bot ID: ${client.user.id}`.green);
	log(`[i] Token: ${api.abtoken}`.green);
	log(`[i] Running version ${settings.abVersion} and in ${client.guilds.cache.size} guilds`.green);

	client.setInterval(function() {
		const activities = [
			'AleeBot ' + settings.abVersion + ' | ' + settings.prefix + 'help',
			'Coding bytes',
			'Drawing shapes',
			'Fighting Quad',
		];
		/*
    setInterval(() => {
      dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
    }, 1800000);*/
		client.user.setPresence({
			activity: {
				name: activities[Math.floor(Math.random() * activities.length)]
			},
			status: 'online',
			afk: false,
		});
	}, 200000);
	client.user.setStatus('online');
	if (readyEmbedMessage === true) {
		const readyEmbed = new Discord.MessageEmbed()
			.setAuthor('AleeBot Status', client.user.avatarURL())
			.setDescription('AleeBot has started')
			.addField('Prefix', `\`${settings.prefix}\``, true)
			.setColor('#5cd65c');
		let statusChannel = client.channels.cache.get(statusChannelID);
		if (!statusChannel) return console.error('The status channel does not exist! Skipping.');
		statusChannel.send(readyEmbed);
	}
  	client.user.setStatus('online');
	rl.prompt();
});

client.on('guildMemberAdd', (member) => {
	if (message.guild.id !== '243022206437687296') return;
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot Logging', client.user.avatarURL())
		.setDescription(`A user has joined this server!`)
		.addField('Username: ', `${member.displayName}`, true)
		.addField('User ID: ', `${member.id}`, true)
		.addField('Joined At: ', `${member.joinedAt}`)
		.setColor('#4bff31')
		.setTimestamp();

	let guildMember = client.channels.cache.get(logChannel);
	if (!guildMember) return;

	guildMember.send(logEmbed);
	if (autoRole === true) {
		if (member.guild.id !== '243022206437687296') return;
		const role = member.guild.roles.cache.get('657426918416580614');
		member.roles.add(role);
		log(`[i] ${member.user.username} joined Alee Productions.`.green);
		log(`[i] I gave ${member.user.username} the "Member" role.`.green);
	}
});

client.on('guildMemberRemove', (member) => {
	if (message.guild.id !== '243022206437687296') return;
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot Logging', client.user.avatarURL())
		.setDescription(`A user has left this server!`)
		.addField('Username: ', `${member.displayName}`, true)
		.addField('User ID: ', `${member.id}`, true)
		.setColor('#ec2727')
		.setTimestamp();

	let guildMember = client.channels.cache.get(logChannel);
	if (!guildMember) return;

	guildMember.send(logEmbed);
})


client.on('messageUpdate', async (oldMessage, newMessage) => {
	if (oldMessage.guild.id !== '243022206437687296') return;
	if (oldMessage.content === newMessage.content) {
		return;
	}
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot Logging', client.user.avatarURL())
		.setDescription(`A message from ${oldMessage.author.username} was edited`)
		.addField('Before: ', `\`\`\`${oldMessage.content}\`\`\``)
		.addField('After: ', `\`\`\`${newMessage.content}\`\`\``)
		.setColor('#ffff1a')
		.setTimestamp()
		.setFooter(`Author ID: ${oldMessage.author.id}`);
		
	let editMessage = client.channels.cache.get(logChannel);
	if (!editMessage) return;

	editMessage.send(logEmbed);
});

client.on('messageDelete', (message) => {
	if (message.guild.id !== '243022206437687296') return;
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot Logging', client.user.avatarURL())
		.setDescription(`A message from ${message.author.username} was deleted`)
		.addField('Deleted Message: ', `\`\`\`${message.content}\`\`\``)
		.setColor('#ff021b')
		.setTimestamp()
		.setFooter(`Author ID: ${message.author.id}`);

	let deleteMessage = client.channels.cache.get(logChannel);
	if (!deleteMessage) return;

	deleteMessage.send(logEmbed);
});

client.on('guildBanAdd', (guild, user) => {
	if (guild.id !== '243022206437687296') return;
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot Logging', client.user.avatarURL())
		.setDescription(`This user got banned from ${guild.name}`)
		.addField('User:', `${user.tag}`)
		.addField('User ID:', `${user.id}`)
		.setColor('#ff021b')
		.setTimestamp();

	let banMessage = client.channels.cache.get(logChannel);
	if (!banMessage) return;

	banMessage.send(logEmbed);
});

client.on('guildBanRemove', (guild, user) => {
	if (guild.id !== '243022206437687296') return;
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot Logging', client.user.avatarURL())
		.setDescription(`This user got unbanned from ${guild.name}`)
		.addField('User:', `${user.tag}`)
		.addField('User ID:', `${user.id}`)
		.setColor('#ff021b')
		.setTimestamp();

	let banMessage = client.channels.cache.get(logChannel);
	if (!banMessage) return;

	banMessage.send(logEmbed);
});

client.on('guildCreate', (guild) => {
	log(`[i] New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`.blue);
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot', client.user.avatarURL())
		.setDescription('I got added to a server!')
		.addField('Server Name:', `${guild.name}`, true)
		.addField('Server ID:', `${guild.id}`, true)
		.addField('Members', guild.memberCount, true)
		.setColor('#5cd65c')
		.setFooter(`We now run on ${client.guilds.cache.size} guilds.`);

	let statusChannel = client.channels.cache.get(statusChannelID);
	if (!statusChannel) return;
	statusChannel.send(logEmbed);
});


client.on('guildDelete', (guild) => {
	log(`[i] I have been removed from: ${guild.name} (id: ${guild.id})`.red);
	const logEmbed = new Discord.MessageEmbed()
		.setAuthor('AleeBot', client.user.avatarURL())
		.setDescription('I got removed from a server...')
		.addField('Server Name:', `${guild.name}`, true)
		.addField('Server ID:', `${guild.id}`, true)
		.setColor('#ff021b')
		.setFooter(`We now run on ${client.guilds.cache.size} guilds.`);

	let statusChannel = client.channels.cache.get(statusChannelID);
	if (!statusChannel) return;
	statusChannel.send(logEmbed);
});

dbl.on('posted', () => {
	log('Server count posted!'.blue);
});

dbl.on('error', (e) => {
	log(`[X | DBL ERROR] ${e}`.red);
});

client.on('message', (msg) => {
	if (msg.author.bot) return;

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
				return msg.channel.createMessage('This command can only be ran in a guild.');
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
