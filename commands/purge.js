module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("It looks like that you don't have the permissions to delete messages.")
    if (isNaN(args[0])) return message.reply("Please put the valid number of messages to purge.");

    if (args[0] > 100) return message.channel.send("Please put a number less than 100.");

    message.channel.bulkDelete(args[0])
    .then( messages => message.channel.send(`Successfully deleted ${messages.size} messages.`))
  };
  
  exports.conf = {
    aliases: ['rm'],
    guildOnly: true,
  };
  exports.help = {
    name: 'purge',
    description: 'Removes messages in a bulk.',
    usage: 'purge [number]',
    category: '- Moderation Commands',
  };
  