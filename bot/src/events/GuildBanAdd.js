import { EmbedBuilder, Events, AuditLogEvent } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.GuildBanAdd,
    async execute(guild, user) {

        const banLog = await guild.fetchAuditLogs({
            type: AuditLogEvent.MemberBanAdd,
            limit: 1,
        });

        const banEntry = banLog.entries.first();

        const guildSetting = await guildSettings.findOne({ where: { guildID: guild.id } });
        if (!guildSetting || !guildSetting.logChannelID) return;

        const logEmbed = new EmbedBuilder()
            .setAuthor({ name: 'AleeBot Logging', iconURL: guild.client.user.avatarURL() })
            .setDescription(`This user got banned from ${guild.name}`)
            .addFields(
                { name: 'User:', value: `${user.tag}` },
                { name: 'User ID:', value: `${user.id}`},
                { name: 'Reason:', value: `${banEntry.reason || 'No reason provided'}` }
            )
            .setColor('#ff021b')
            .setTimestamp();

        let banMessage = guild.client.channels.cache.get(guildSetting.logChannelID);
        if (!banMessage) return;

        await banMessage.send({ embeds: [logEmbed]});
    }
};
