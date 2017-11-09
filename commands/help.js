const Discord = require('discord.js');
//const config = require('./absettings.json');
//const abversion = require(config.abversion)
exports.run = (client, message, args, config, abversion) => {

var embed = new Discord.RichEmbed()
 .setTitle(`Commands for AleeBot ` + abversion + ` and running on ${client.guilds.size} servers.`)
 .setDescription('Every command you put in this bot must start with `ab:`')
 .setThumbnail("https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048")
 .addField('Fun Stuff:', 'ask\nship',true)
 .addField('Info:', 'userinfo\n',true)
 .addField('Link:', 'botinvite\nserverinvite\ngit',true)
 .addField('Owner Only:', 'say\neval',true)
 .addField('Monitor:', 'ping\nuptime',true)
 .addField('Etc:', 'avatarurl', true)
 .setFooter("AleeBot "+ abversion +" Copyright 2017. Created by Alee14", "https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048")
 .setColor("#7af442")
 message.channel.sendEmbed(embed);
} /* This feature is broken
  else if {
  message.channel.send ("```Commands for AleeBot "+ abversion +".\nYou are using this view because this bot doesn't have permission to send embed link.\n\n" +
              ''+prefix+'avatarurl\n' +
              ''+prefix+'git\n' +
              ''+prefix+'ping\n' +
              ''+prefix+'suggest\n' +
              ''+prefix+'uptime\n' +
              ''+prefix+'userinfo\n' +
              ''+prefix+'serverinfo\n' +
              ''+prefix+'botinvite\n' +
              ''+prefix+'serverinvite\n' +
              ''+prefix+'plan\n' +
              ''+prefix+'attack\n' +
              ''+prefix+'ask\n' +
              ''+prefix+'ship\n\n' +
              "Copyright "+ year +". Created by Alee14\n```"); */
  exports.conf = {
    enabled: true,

    guildOnly: false,

    aliases: ['h', 'halp'],

    permLevel: 0

    };


    exports.help = {

    name: 'help',

    description: 'Displays all the available commands for your permission level.',

    usage: 'help [command]'

    };
