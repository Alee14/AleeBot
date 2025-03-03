import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';

export default {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Information about a user.'),
    async execute(interaction) {
        const userEmbed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setDescription('User Information')
            .setThumbnail(interaction.user.avatarURL())
            .addFields(
                { name: 'Names', value: `**Display Name:**  ${interaction.member.displayName}\n**Username:**  ${interaction.user.username}`},
                { name: 'Identity', value: `**User ID:** ${interaction.user.id}` },
                { name: 'Create and Join Times', value: `**Created At:**  ${interaction.member.user.createdAt.toUTCString()}\n**Joined Guild At:**  ${interaction.member.joinedAt.toUTCString()}`}
            )
            .setColor(abEmbedColour);
        return await interaction.reply({embeds: [userEmbed]});
    }
};
