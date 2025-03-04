import { EmbedBuilder, Events } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.MessageDelete,
    async execute(msg) {
        if (!msg.content) return;

        const guildSetting = await guildSettings.findOne({ where: { guildID: msg.guild.id } });
        if (!guildSetting || !guildSetting.logChannelID) return;

        const logEmbed = new EmbedBuilder()
            .setAuthor('AleeBot Logging', msg.client.user.avatarURL())
            .setDescription(`A message from ${msg.author.username} was deleted in <#${msg.channel.id}>`)
            .addFields({ name: 'Deleted Message: ', value: `\`\`\`${msg.content}\`\`\`` })
            .setColor('#ff021b')
            .setTimestamp()
            .setFooter(`Author ID: ${msg.author.id}`);

        let deleteMessage = msg.client.channels.cache.get(guildSetting.logChannelID);
        if (!deleteMessage) return;

        await deleteMessage.send({ embeds: [logEmbed]});
    }
};
