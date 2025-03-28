import { EmbedBuilder, Events, AttachmentBuilder } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.MessageBulkDelete,
    async execute(msg, channel) {
        try {
            const guildSetting = await guildSettings.findOne({ where: { guildID: channel.guild.id } });
            if (!guildSetting || !guildSetting.logChannelID) return;

            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot Logging', iconURL: channel.client.user.avatarURL() })
                .setDescription(`A bulk of ${msg.size} messages were deleted in ${channel}`)
                .setColor('#ff021b')
                .setTimestamp();

            let messages = [];

            msg.forEach(message => {
                messages.push(`[${message.createdAt.toUTCString()}]`);
                messages.push(`${message.author.username} (${message.author.id})`);
                messages.push(`Message (${message.id}): ${message.content}`);
                messages.push('-----------------------------------');
            });

            const messageContent = messages.join('\n');
            const attachment = new AttachmentBuilder(Buffer.from(messageContent, 'utf-8'), { name: 'messages.txt' });

            let deleteMessage = channel.client.channels.cache.get(guildSetting.logChannelID);
            if (!deleteMessage) return;

            await deleteMessage.send({ embeds: [logEmbed], files: [attachment] });
        } catch (e) {
            console.error(e);
        }
    }
};
