import { EmbedBuilder, Events } from 'discord.js';
import { guildSettings } from '../db/models/guild-settings.js';

export default {
    name: Events.GuildMemberRemove,
    async execute(member) {
        try {
            const guildSetting = await guildSettings.findOne({ where: { guildID: member.guild.id } });
            if (!guildSetting || !guildSetting.logChannelID) return;

            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot Logging', iconURL: member.client.user.avatarURL() })
                .setDescription('A user has left this server.')
                .addFields(
                    { name: 'Username: ', value: `${member.user.username}`, inline: true },
                    { name: 'User ID: ', value: `${member.id}`, inline: true },
                )
                .setColor('#ec2727')
                .setTimestamp();

            let guildMember = member.client.channels.cache.get(guildSetting.logChannelID);
            if (!guildMember) return;

            await guildMember.send({ embeds: [logEmbed] });
        } catch (e) {
            console.error(e);
        }
    }
};
