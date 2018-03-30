/********************************
 * 
 * Jail: Command for AleeBot
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
    if (message.guild.id != '243022206437687296') return message.reply ('This is a ACN exclusive command.');

    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('It looks like that you don\'t have the permissions to jail members.');
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Uhh... I don\'t have permission to jail members.');

    const member = message.mentions.members.first();
    if (!member) return await message.reply('Uhh... Please mention a member first.');

    member.addRole(message.guild.roles.find('name', 'Jail'));
    message.reply(`Alright, I just jailed ${member.user.tag}.`)
};

exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'jail',
    description: 'Jails a member',
    usage: 'jail [user]',
    category: '- Moderation Commands',
  };
  