/********************************
 * 
 * Ban: Command for AleeBot
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
    let mreason = args.join(" ").slice(22);

    if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply("It looks like that you don't have the permissions to ban people.")
    const member = message.mentions.members.first();
    if (!member) return message.reply("Uhh... Please mention a member first.");
    member.ban({
        days: args[1] || null,
        reason: `Banned by ${message.author.tag}`
    });
    message.reply("User Banned!");
};

exports.conf = {
  aliases: [],
  guildOnly: true,
};
exports.help = {
  name: 'ban',
  description: 'Bans a member',
  usage: 'ban [user] [time]',
  category: '- Moderation Commands',
};
