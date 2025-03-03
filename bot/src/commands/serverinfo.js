import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';

export default {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Information about this server.'),
    async execute(interaction) {
        // const listedChannels = [];
        let guildOwner = await interaction.guild.fetchOwner();
        let memberCountNoBots = await interaction.guild.members.fetch().then((members) => members.filter(member => !member.user.bot).size);

        const serverEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .setDescription('Server Information')
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                { name: 'Main Information', value: `**Server Name:** ${interaction.guild.name}\n**Server ID:** ${interaction.guild.id}\n**Server Owner:** ${guildOwner.user.tag}`},
                { name: 'Join Dates', value: `**Created At:** ${interaction.guild.createdAt.toUTCString()}\n**AleeBot Joined:** ${interaction.guild.joinedAt.toUTCString()}`},
                { name: 'Total Members (with bots)', value: `${interaction.guild.memberCount}` },
                { name: 'Total Members (without bots)', value: `${memberCountNoBots}` }
            )
            /*message.guild.channels.cacheType.forEach(channel => {
                listedChannels.push(channel)
            })*/
            //.addField('Channels', `${listedChannels.join('\n')}`)
            //.addField('Total Channels', message.guild.channelCountMode)
            .setColor(abEmbedColour);
        return await interaction.reply({ embeds: [serverEmbed] });
    }
};
