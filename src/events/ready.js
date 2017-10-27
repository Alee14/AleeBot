exports.run = (client, abVersion) => {
    console.log("[>] AleeBot is now ready!")
    console.log("[i] Running version " + abVersion + ` and in ${client.guilds.size} guilds`)
    client.user.setPresence({
        game: {
            name: `ab:help | ${client.guilds.size} servers`,
            type: 0
        }
    });
    client.user.setStatus('online')
}