import { EmbedBuilder, Events } from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    name: Events.GuildCreate,
    async execute(guild) {
        console.log(`[i] New guild joined: ${guild.name} (${guild.id}). This guild has ${guild.memberCount} members!`);
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

        await guildSettings.create({ guildID: guild.id });

        let statusChannel = guild.client.channels.cache.get(process.env.statusChannelID);
        if (!statusChannel) return;
        await statusChannel.send({ embeds: [logEmbed] });
    }
};
