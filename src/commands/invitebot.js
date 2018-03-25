module.exports.run = async (client, message) => {
    message.reply("Continue in DMs.")
    message.author.send('Want AleeBot in your server? Here\'s the link: https://discordapp.com/oauth2/authorize?client_id=282547024547545109&permissions=68185158&scope=bot');
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'invitebot',
    description: 'Invite AleeBot to your server.',
    usage: 'invitebot',
    category: '- General Commands',
  };
  