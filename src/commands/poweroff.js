module.exports.run = async (client, message, args) => {
    if (!['242775871059001344',].includes(message.author.id)) return message.reply('Nope! You need the person who created this bot to use this command.');
    await message.reply(':warning: AleeBot will now exit!');
    process.exit(0);
  };
  
  exports.conf = {
    aliases: ['reboot'],
    guildOnly: false,
  };
  exports.help = {
    name: 'poweroff',
    description: 'Turns off AleeBot.',
    usage: 'poweroff',
    category: '- Owners Only',
  };
  