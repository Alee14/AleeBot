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
  