const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
//This command was ported from AstralMod
var timeString; // What we'll eventually put into the message

var uptime = parseInt(client.uptime); // Get uptime in ms

uptime = Math.floor(uptime / 1000); // Convert from ms to s

var uptimeMinutes = Math.floor(uptime / 60); // Get the uptime in minutes

var minutes = uptime % 60;

var hours = 0;

while (uptimeMinutes >= 60) {

hours++;

uptimeMinutes = uptimeMinutes - 60;

}



if (uptimeMinutes < 10) {

timeString = hours + ":0" + uptimeMinutes // We need to add an additional 0 to the minutes

} else {

timeString = hours + ":" + uptimeMinutes // We don't need to add an extra 0.

}



message.reply("AleeBot has been up for " + timeString + " hours. Looks like i'm not tired :wink:");

commandProcessed = true;
}
