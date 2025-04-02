import { AttachmentBuilder, EmbedBuilder, Events } from 'discord.js';
import { guildSettings } from '../db/models/guild-settings.js';

export default {
    name: Events.MessageDelete,
    async execute(msg) {
        try {
            if (!msg.content) return;

            const guildSetting = await guildSettings.findOne({ where: { guildID: msg.guild.id } });
            if (!guildSetting || !guildSetting.messageLogChannelID) return;

            const useEmbedFields = msg.content.length <= 1024;

            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot Logging', iconURL: msg.client.user.avatarURL() })
                .setDescription(`A message from ${msg.author.username} was deleted in ${msg.channel}`)
                .setColor('#ff021b')
                .setTimestamp()
                .setFooter({ text: `Author ID: ${msg.author.id}\nMessage ID: ${msg.id}` });

            if (useEmbedFields) {
                logEmbed.addFields({ name: 'Deleted Message: ', value: `\`\`\`\n${msg.content}\n\`\`\`` });
            }

            let deleteMessage = msg.client.channels.cache.get(guildSetting.messageLogChannelID);
            if (!deleteMessage) return;

            if (useEmbedFields) {
                await deleteMessage.send({ embeds: [logEmbed] });
            } else {
                const attachment = new AttachmentBuilder(Buffer.from(msg.content, 'utf-8'), { name: 'message.txt' });

                await deleteMessage.send({
                    embeds: [logEmbed],
                    files: [attachment]
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
};
