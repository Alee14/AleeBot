/********************************
 * 
 * Purge: Command for AleeBot
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
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("It looks like that you don't have the permissions to delete messages.")
    if (isNaN(args[0])) return message.reply("Please put the valid number of messages to purge.");

    if (args[0] > 100) return message.channel.send("Please put a number less than 100.");

    message.channel.bulkDelete(args[0])
    .then( messages => message.channel.send(`Successfully deleted ${messages.size} messages.`))
  };
  
  exports.conf = {
    aliases: ['rm'],
    guildOnly: false,
  };
  exports.help = {
    name: 'purge',
    description: 'Removes messages in a bulk.',
    usage: 'purge [number]',
    category: '- Moderation Commands',
  };
  