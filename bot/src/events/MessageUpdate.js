import { EmbedBuilder, Events } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.MessageUpdate,
    async execute(msg, newmsg) {
        const guildSetting = await guildSettings.findOne({ where: { guildID: msg.guild.id } });
        if (!msg.guild || !guildSetting || !guildSetting.logChannelID) return;
        if (msg.content === newmsg.content) return;

        const logEmbed = new EmbedBuilder()
            .setAuthor({ name: 'AleeBot Logging', iconURL: msg.client.user.avatarURL() })
            .setDescription(`A message from ${msg.author.username} was edited in ${msg.channel}`)
            .addFields(
                { name: 'Before: ', value: `\`\`\`${msg.content}\`\`\`` },
                { name: 'After: ', value: `\`\`\`${newmsg.content}\`\`\`` }
            )
            .setColor('#ffff1a')
            .setTimestamp()
            .setFooter({ text: `Author ID: ${msg.author.id}` });

        let editMessage = msg.client.channels.cache.get(guildSetting.logChannelID);
        if (!editMessage) return;

        await editMessage.send({ embeds: [logEmbed] });
    }
};
