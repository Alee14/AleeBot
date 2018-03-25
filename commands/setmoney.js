/********************************
 * 
 * SetMoney: Command for AleeBot
 * 
 * Copyright (c) 2018 AleeCorp
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ********************************/
module.exports.run = async (client, message, args) => {
    const { RichEmbed } = require('discord.js');
    const economy = require('discord-eco')
    if (!['242775871059001344',].includes(message.author.id)) return message.reply('Nope! You need the person who created this bot to use this command.');

    if (!args[0]) {
        message.reply('You need a amount.');
        return;
    }

    if(isNaN(args[0])) {
        message.reply("Please make sure it's a number.");
        return;
    }
    
    let defineduser = '';
    if (!args[1]) {
        defineduser = message.author.id;
    } else {
        let firstMentioned = message.mentions.users.first();
        defineduser = firstMentioned.id;

    }

    economy.updateBalance(defineduser + message.guild.id, parseInt(args[0])).then((i) => {
        message.reply(`User defined has ${args[0]} dollars added or removed to their account.`)
    });
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: true,
  };
  exports.help = {
    name: 'setmoney',
    description: 'Sets money.',
    usage: 'setmoney [amount] [user]',
    category: '- Owners Only',
  };
  