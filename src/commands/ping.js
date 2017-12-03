module.exports.run = async (bot, message, args) => {
    message.reply("**PONG!** :ping_pong: " + Math.round(client.ping) + " ms");
}

module.exports.config = {
    command: "ping"
}