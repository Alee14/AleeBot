module.exports.run = async (client, message) => {
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply("It looks like that you don't have the permissions to ban people.")
    const member = message.mentions.members.first();
    if (!member) return message.reply("Uhh... Please mention a member first.");
    member.kick(`Kicked by: ${message.author.tag}`);
    message.reply("User Kicked!");
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
