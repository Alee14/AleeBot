/********************************
 * 
 * Kick: Command for AleeBot
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
    const mreason = args.join(" ").slice(22);
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply("It looks like that you don't have the permissions to ban people.")
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Uhh... I don\'t have permission to kick members.');
    const member = message.mentions.members.first();
    if (!member) return message.reply("Uhh... Please mention a member first.");
    member.kick(`Kicked by: ${message.author.tag} Reason: ` + mreason);
    message.reply(`${member.user.tag} has been kicked for the reason: ` + mreason);
};

exports.conf = {
  aliases: [],
  guildOnly: true,
};
exports.help = {
  name: 'kick',
  description: 'Kicks a member',
  usage: 'kick [user]',
  category: '- Moderation Commands',
};
