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
// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args) => {
	/*
    if (!['242775871059001344'].includes(message.author.id)) return message.reply('Nope! You need the person who created this bot to use this command.');
    if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName)
	    || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
    delete require.cache[require.resolve(`./${command.name}.js`)];
    try {
        const newCommand = require(`./${command.name}.js`);
        message.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
        console.log(error);
        message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
    }
    message.channel.send(`Command \`${command.name}\` was reloaded!`);*/

	message.reply('Coming soon.');

};
  
exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'reload',
	description: 'Reloads command.',
	usage: 'reload [command]',
	category: '- Owners Only',
};
  
  