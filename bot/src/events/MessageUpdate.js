import { EmbedBuilder, Events, AttachmentBuilder } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.MessageUpdate,
    async execute(msg, newmsg) {
        try {
            const guildSetting = await guildSettings.findOne({ where: { guildID: msg.guild.id } });
            if (!msg.guild || !guildSetting || !guildSetting.logChannelID) return;
            if (msg.content === newmsg.content) return;

            const useEmbedFields = msg.content.length <= 1024 &&
                newmsg.content.length <= 1024;

            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot Logging', iconURL: msg.client.user.avatarURL() })
                .setDescription(`A message from ${msg.author.username} was edited in ${msg.channel}`)
                .setColor('#ffff1a')
                .setTimestamp()
                .setFooter({ text: `Author ID: ${msg.author.id}\nMessage ID: ${msg.id}` });

            if (useEmbedFields) {
                logEmbed.addFields(
                    { name: 'Before: ', value: `\`\`\`\n${msg.content}\n\`\`\`` },
                    { name: 'After: ', value: `\`\`\`\n${newmsg.content}\n\`\`\`` }
                );
            }

            let editMessage = msg.client.channels.cache.get(guildSetting.logChannelID);
            if (!editMessage) return;

            if (useEmbedFields) {
                await editMessage.send({ embeds: [logEmbed] });
            } else {
                let messageContent = [];
                messageContent.push(`Before:\n${msg.content}`);
                messageContent.push('-----------------------------------');
                messageContent.push(`After:\n${newmsg.content}`);

                messageContent = messageContent.join('\n');

                const attachment = new AttachmentBuilder(Buffer.from(messageContent, 'utf-8'), { name: 'message.txt' });

                await editMessage.send({
                    embeds: [logEmbed],
                    files: [attachment],
                    content: 'Message content was too long to display in an embed.'
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
};
