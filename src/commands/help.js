module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setAuthor('AleeBot ' + abVersion + ` Help and on ${client.guilds.size} servers`, "https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048")
    .setDescription("Every command you input into AleeBot is `" + config.prefix + "`")
    .addField("- General Commands", "ping\nuptime\ngit", true)
    .setFooter("AleeCorp Copyright 2017")
    .setColor("#1fd619")
    message.channel.sendEmbed(embed);

}

module.exports.config = {
    command: "help"
}