import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';

export default {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Information about this server.')
        .setContexts(0),
    async execute(interaction) {
        // let listedChannels = [];
        let guildOwner = await interaction.guild.fetchOwner();
        let memberCountNoBots = await interaction.guild.members.fetch().then((members) => members.filter(member => !member.user.bot).size);

        // interaction.guild.channels.cache.each(channel => {
        //     listedChannels.push(channel);
        // });

        const serverEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .setDescription('Server Information')
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                { name: 'Main Information', value: `**Server Name:** ${interaction.guild.name}\n**Server ID:** ${interaction.guild.id}\n**Server Owner:** ${guildOwner.user.username}` },
                { name: 'Join Dates', value: `**Created At:** ${interaction.guild.createdAt.toUTCString()}\n**AleeBot Joined:** ${interaction.guild.joinedAt.toUTCString()}` },
                { name: 'Total Channels (without threads)', value: interaction.guild.channels.channelCountWithoutThreads.toString() },
                // { name: 'Channels', value: listedChannels.join(' ') },
                { name: 'Total Members (with bots)', value: interaction.guild.memberCount.toString() },
                { name: 'Total Members (without bots)', value: memberCountNoBots.toString() }
            )
            .setColor(abEmbedColour);
        return await interaction.reply({ embeds: [serverEmbed] });
    }
};
