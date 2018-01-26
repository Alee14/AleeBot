module.exports.run = async (client, message, args) => {
    var embed = new Discord.RichEmbed()
    .setAuthor('AleeBot ' + abVersion + `Changelog`, "https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048")
    .setDescription("What's new in AleeBot?")
    .addField("+ Rewritten command handler", true)
    .addField("+ New uptime command (Thanks to Rain)", true)
    .addField("? Some commands are the same from 1.x", true)
    .setFooter("AleeCorp Copyright 2017")
    .setColor("#1fd619")
    message.channel.sendEmbed(embed);

}

module.exports.config = {
    command: "changelog"
}