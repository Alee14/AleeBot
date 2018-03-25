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
