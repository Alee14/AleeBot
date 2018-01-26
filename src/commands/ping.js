module.exports.run = async (client, message, args) => {
    message.reply("**PONG!** :ping_pong: " + Math.round(client.ping) + " ms");
}

module.exports.config = {
    command: "ping"
}