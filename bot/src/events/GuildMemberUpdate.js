import { EmbedBuilder, Events } from 'discord.js';
import { guildSettings } from '../db/models/guild-settings.js';

export default {
    name: Events.GuildMemberUpdate,
    async execute(member, newMember) {
        try {
            if (member.nickname === newMember.nickname) return;
            const guildSetting = await guildSettings.findOne({ where: { guildID: member.guild.id } });
            if (!guildSetting || !guildSetting.memberLogChannelID) return;

            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot Logging', iconURL: member.client.user.avatarURL() })
                .setDescription(`${member.user} has changed their nickname.`)
                .addFields(
                    { name: 'Old Nickname: ', value: `${member.nickname}`, inline: true },
                    { name: 'New Nickname: ', value: `${newMember.nickname}`, inline: true },
                )
                .setColor('#ffff1a')
                .setTimestamp();

            let guildMember = member.client.channels.cache.get(guildSetting.memberLogChannelID);
            if (!guildMember) return;

            await guildMember.send({ embeds: [logEmbed] });
        } catch (e) {
            console.error(e);
        }
    }
};
