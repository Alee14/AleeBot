exports.run = (client, member) => {
	 member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " has joined the server");
}