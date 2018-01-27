module.exports.run = async (client, message, args, abVersion) => {
    message.reply("**PONG!** :ping_pong: " + Math.round(client.ping) + " ms");
}

module.exports.config = {
    command: "ping"
}