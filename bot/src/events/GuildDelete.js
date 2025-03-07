import { EmbedBuilder, Events } from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.GuildDelete,
    async execute(guild) {
        console.log(`[i] I have been removed from: ${guild.name} (${guild.id})`);
        const logEmbed = new EmbedBuilder()
            .setAuthor({ name: 'AleeBot', iconURL: guild.client.user.avatarURL() })
            .setDescription('I got removed from a server...')
            .addFields(
                { name: 'Server Name:', value: `${guild.name}`, inline: true },
                { name: 'Server ID:', value: `${guild.id}`, inline: true },
            )
            .setColor(abEmbedColour)
            .setFooter({ text: `We now run on ${guild.client.guilds.cache.size} guilds.` });

        const guildSetting = await guildSettings.findOne({ where: { guildID: guild.id } });

        if (guildSetting) {
            await guildSettings.destroy({ where: { guildID: guild.id } });
        }

        let statusChannel = guild.client.channels.cache.get(process.env.statusChannelID);
        if (!statusChannel) return;
        await statusChannel.send({ embeds: [logEmbed]});
    }
};
