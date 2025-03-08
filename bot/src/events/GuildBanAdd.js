import { EmbedBuilder, Events, AuditLogEvent } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.GuildBanAdd,
    async execute(ban) {
        const guildSetting = await guildSettings.findOne({ where: { guildID: ban.guild.id } });
        if (!guildSetting || !guildSetting.logChannelID) return;

        const banLog = await ban.guild.fetchAuditLogs({
            type: AuditLogEvent.MemberBanAdd,
            limit: 1,
        });

        const banEntry = banLog.entries.first();

        const logEmbed = new EmbedBuilder()
            .setAuthor({ name: 'AleeBot Logging', iconURL: ban.guild.client.user.avatarURL() })
            .setDescription('This user got banned from this server.')
            .addFields(
                { name: 'User:', value: `${ban.user.username}` },
                { name: 'User ID:', value: `${ban.user.id}`},
                { name: 'Reason:', value: `${banEntry.reason || 'No reason provided'}` }
            )
            .setColor('#ff021b')
            .setTimestamp();

        let banMessage = ban.guild.client.channels.cache.get(guildSetting.logChannelID);
        if (!banMessage) return;

        await banMessage.send({ embeds: [logEmbed] });
    }
};
