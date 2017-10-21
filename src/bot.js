/*********************************************
*
*	AleeBot for Discord servers
*	Copyright (C) 2017 AleeCorp 
*
**********************************************/
const Discord = require('discord.js');
const client = new Discord.Client(); 
const abVersion = "2.0.0"; 
const prefix = "abb:"
const config = require('./absettings.json'); 

client.on('ready', () => {
	console.log("[>] AleeBot is now ready!")
	console.log("[i] Running version " + abVersion + ` and in ${client.guilds.size} guilds`)
	 client.user.setPresence({ 
        game: { 
            name: 'with version ' + abVersion, 
            type: 0 
        } 
	 });
	client.user.setStatus('online')
});


client.on("message", function(message) { 
    if (message.author.bot) return; 
    if (message.channel.type === "dm") return; 
    if (message.content.indexOf(config.prefix) !== 0) return;
	
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);
 
	let args = message.content.split(" ").slice(1);
	
	if(command === 'test'){
		message.reply(`[SUCCESS] This command is temporarily so this command will be deleted\nRunning version ` + abVersion);
	}
	
});
client.login(config.abtoken).catch(function() { 
    console.log("[X] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com."); 
}); 