import { EmbedBuilder, Events } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.GuildBanAdd,
    async execute(guild, user) {
        const guildSetting = await guildSettings.findOne({ where: { guildID: guild.id } });
        if (!guildSetting || !guildSetting.logChannelID) return;

        const logEmbed = new EmbedBuilder()
            .setAuthor({ name: 'AleeBot Logging', iconURL: guild.client.user.avatarURL() })
            .setDescription(`This user got banned from ${guild.name}`)
            .addFields(
                { name: 'User:', value: `${user.tag}` },
                { name: 'User ID:', value: `${user.id}`}
            )
            .setColor('#ff021b')
            .setTimestamp();

        let banMessage = guild.client.channels.cache.get(guildSetting.logChannelID);
        if (!banMessage) return;

        await banMessage.send({ embeds: [logEmbed]});
    }
};
