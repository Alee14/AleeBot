import { EmbedBuilder, Events } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const guildSetting = await guildSettings.findOne({ where: { guildID: member.guild.id } });
        if (!guildSetting || !guildSetting.logChannelID) return;

        const logEmbed = new EmbedBuilder()
            .setAuthor({ name: 'AleeBot Logging', iconURL: member.client.user.avatarURL() })
            .setDescription('A user has joined this server!')
            .addFields(
                { name: 'Username: ', value: `${member.user}`, inline: true },
                { name: 'User ID: ', value: `${member.id}`, inline: true },
                { name: 'Created At: ', value: `${member.user.createdAt.toUTCString()}`}
            )
            .setColor('#4bff31')
            .setTimestamp();

        let guildMember = member.client.channels.cache.get(guildSetting.logChannelID);
        if (!guildMember) return;

        await guildMember.send({ embeds: [logEmbed] });
    }
};
