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
            name: `ab:help | ${client.guilds.size} servers`, 
            type: 0 
        } 
	 });
	client.user.setStatus('online')
});

client.on("guildCreate", guild => {
 
    console.log(`[i] New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	
	client.user.setPresence({ 
        game: { 
            name: `ab:help | ${client.guilds.size} servers`, 
            type: 0 
        } 
	 });
 
});
 
 
client.on("guildDelete", guild => {
 
    console.log(`[i] I have been removed from: ${guild.name} (id: ${guild.id})`);
	
	client.user.setPresence({ 
        game: { 
            name: `ab:help | ${client.guilds.size} servers`, 
            type: 0 
        } 
	 });
 
 
});

client.on('guildMemberAdd', member => {
	if (member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " has joined the server"));
	else return;
});

client.on('guildMemberRemove', member => {
	member.guild.channels.find("name", "welcomes-and-byes").sendMessage(`**${member.user.username}** has left the server`).catch
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