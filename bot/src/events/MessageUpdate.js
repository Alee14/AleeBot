import { EmbedBuilder, Events } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.MessageUpdate,
    async execute(oldmsg, newmsg) {
        const guildSetting = await guildSettings.findOne({ where: { guildID: oldmsg.guild.id } });
        if (!oldmsg.guild || !guildSetting || !guildSetting.logChannelID) return;
        if (oldmsg.content === newmsg.content) return;

        const logEmbed = new EmbedBuilder()
            .setAuthor({ name: 'AleeBot Logging', iconURL: oldmsg.client.user.avatarURL() })
            .setDescription(`A message from ${oldmsg.author.username} was edited in <#${oldmsg.channel.id}>`)
            .addFields(
                { name: 'Before: ', value: `\`\`\`${oldmsg.content}\`\`\`` },
                { name: 'After: ', value: `\`\`\`${newmsg.content}\`\`\`` }
            )
            .setColor('#ffff1a')
            .setTimestamp()
            .setFooter(`Author ID: ${oldmsg.author.id}`);

        let editMessage = oldmsg.client.channels.cache.get(guildSetting.logChannelID);
        if (!editMessage) return;

        await editMessage.send({ embeds: [logEmbed]});
    }
};
