import { EmbedBuilder, Events } from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.GuildCreate,
    async execute(guild) {
        try {
            console.log(`[i] New guild joined: ${guild.name} (${guild.id}). This guild has ${guild.memberCount} members!`);
            const guildSetting = await guildSettings.findOne({ where: { guildID: guild.id } });
            if (!guildSetting) await guildSettings.create({ guildID: guild.id });

            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot', iconURL: guild.client.user.avatarURL() })
                .setDescription('I got added to a server!')
                .addFields(
                    { name: 'Server Name:', value: `${guild.name}`, inline: true },
                    { name: 'Server ID:', value: `${guild.id}`, inline: true },
                    { name: 'Members', value: `${guild.memberCount}`, inline: true }
                )
                .setColor(abEmbedColour)
                .setFooter({ text: `We now run on ${guild.client.guilds.cache.size} guilds.` });

            let statusChannel = guild.client.channels.cache.get(process.env.STATUS_CHANNEL_ID);
            if (!statusChannel) return;
            await statusChannel.send({ embeds: [logEmbed] });
        } catch (e) {
            console.error(e);
        }
    }
};
