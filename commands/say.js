module.exports.run = async (client, message, args) => {
    if (!['242775871059001344',].includes(message.author.id)) return message.reply('Nope! You need the person who created this bot to use this command.');
    let absay = args.join(" ");
    message.delete().catch();
    message.channel.send(absay);
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'say',
    description: 'You can control AleeBot now!',
    usage: 'say [context]',
    category: '- Owners Only',
  };
  