/********************************
 * 
 * Eval: Command for AleeBot
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
    if (!['242775871059001344',].includes(message.author.id)) return message.reply('Nope! You need the person who created this bot to use this command.');
    const { RichEmbed } = require('discord.js');
    const code = args.join(' ');
  
    let evaled;
    let remove;
  
    try {
      remove = text => {
        if (typeof(text) === 'string') {
          return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
        } else {
          return text;
        }
      };
  
      evaled = eval(code);
  
      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled);
      }
  
    } catch (err) {
      const embed = new RichEmbed()
        .setAuthor('Eval Error')
        .setDescription('Eval\'s result')
        .addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``)
        .addField(':outbox_tray: Output:', `\`\`\`${err}\`\`\``)
        .setFooter('Eval', client.user.avatarURL)
        .setColor('RED');
      return message.channel.send({ embed });
    }
  
    try {
      const embed = new RichEmbed()
        .setAuthor('Eval Success')
        .setDescription('Eval\'s result')
        .addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``)
        .addField(':outbox_tray: Output:', `\`\`\`js\n${remove(evaled)}\n\`\`\``)
        .setFooter('Eval', client.user.avatarURL)
        .setColor('GREEN');
  
      return message.channel.send({ embed });
    } catch (err) {
      const embed = new RichEmbed()
        .setAuthor('Eval Error')
        .setDescription('Eval\'s result')
        .addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``)
        .addField(':outbox_tray: Output:', `\`\`\`${err}\`\`\``)
        .setFooter('Eval', client.user.avatarURL)
        .setColor('RED');
      return message.channel.send({ embed });
    }
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: true,
  };
  exports.help = {
    name: 'eval',
    description: 'Evalulates commands.',
    usage: '<code>',
    category: '- Owners Only',
  };
  