import { Events } from 'discord.js';

export default {
    name: Events.GuildDelete,
    async execute(guild) {
        console.log(`[i] I have been removed from: ${guild.name} (${guild.id})`);
        // const logEmbed = new Discord.MessageEmbed()
        //     .setAuthor('AleeBot', client.user.avatarURL())
        //     .setDescription('I got removed from a server...')
        //     .addField('Server Name:', `${guild.name}`, true)
        //     .addField('Server ID:', `${guild.id}`, true)
        //     .setColor('#ff021b')
        //     .setFooter(`We now run on ${client.guilds.cache.size} guilds.`);
        //
        // let statusChannel = client.channels.cache.get(statusChannelID);
        // if (!statusChannel) return;
        // statusChannel.send({ embeds: [logEmbed]});
    }
};
