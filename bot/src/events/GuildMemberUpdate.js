import { EmbedBuilder, Events } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.GuildMemberUpdate,
    async execute(member, newMember) {
        try {
            const guildSetting = await guildSettings.findOne({ where: { guildID: member.guild.id } });
            if (!guildSetting || !guildSetting.logChannelID) return;
            if (!member.nickname || member.nickname === newMember.nickname) return;

            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot Logging', iconURL: member.client.user.avatarURL() })
                .setDescription(`${member.user} has changed their nickname.`)
                .addFields(
                    { name: 'Old Nickname: ', value: `${member.nickname}`, inline: true },
                    { name: 'New Nickname: ', value: `${newMember.nickname}`, inline: true },
                )
                .setColor('#ffff1a')
                .setTimestamp();

            let guildMember = member.client.channels.cache.get(guildSetting.logChannelID);
            if (!guildMember) return;

            await guildMember.send({ embeds: [logEmbed] });
        } catch (e) {
          console.error(e);
        }
    }
};
