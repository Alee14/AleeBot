import { Events } from 'discord.js';

export default {
    name: Events.GuildCreate,
    async execute(guild) {
        console.log(`[i] New guild joined: ${guild.name} (${guild.id}). This guild has ${guild.memberCount} members!`);
        // const logEmbed = new Discord.MessageEmbed()
        //     .setAuthor('AleeBot', client.user.avatarURL())
        //     .setDescription('I got added to a server!')
        //     .addField('Server Name:', `${guild.name}`, true)
        //     .addField('Server ID:', `${guild.id}`, true)
        //     .addField('Members', `${guild.memberCount}`, true)
        //     .setColor('#5cd65c')
        //     .setFooter(`We now run on ${client.guilds.cache.size} guilds.`);
        //
        // let statusChannel = client.channels.cache.get(statusChannelID);
        // if (!statusChannel) return;
        // statusChannel.send({ embeds: [logEmbed]});
    }
};
