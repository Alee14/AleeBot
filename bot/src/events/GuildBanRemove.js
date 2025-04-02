import { EmbedBuilder, Events } from 'discord.js';
import { guildSettings } from '../db/models/guild-settings.js';

export default {
    name: Events.GuildBanRemove,
    async execute(ban) {
        try {
            const guildSetting = await guildSettings.findOne({ where: { guildID: ban.guild.id } });
            if (!guildSetting || !guildSetting.memberLogChannelID) return;

            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot Logging', iconURL: ban.guild.client.user.avatarURL() })
                .setDescription('This user got unbanned from this server.')
                .addFields(
                    { name: 'User:', value: `${ban.user.username}` },
                    { name: 'User ID:', value: `${ban.user.id}` }
                )
                .setColor('#ff021b')
                .setTimestamp();

            let banMessage = ban.guild.client.channels.cache.get(guildSetting.memberLogChannelID);
            if (!banMessage) return;

            await banMessage.send({ embeds: [logEmbed] });
        } catch (e) {
            console.error(e);
        }
    }
};
