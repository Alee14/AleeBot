import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';

export default {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Information about a user.')
        .addUserOption(option =>
            option
                .setName('username')
                .setDescription('The user to get the information of')),
    async execute(interaction) {
        const username = interaction.options.getUser('username') || interaction.user;
        const member = interaction.guild.members.cache.get(username.id);
        const userEmbed = new EmbedBuilder()
            .setAuthor({ name: username.tag, iconURL: username.avatarURL() })
            .setDescription('User Information')
            .setThumbnail(username.avatarURL())
            .addFields(
                { name: 'Names', value: `**Display Name:**  ${member.displayName}\n**Username:**  ${username.username}`},
                { name: 'Identity', value: `**User ID:** ${username.id}` },
                { name: 'Create and Join Times', value: `**Created At:**  ${username.createdAt.toUTCString()}\n**Joined Guild At:**  ${member.joinedAt.toUTCString()}`}
            )
            .setColor(abEmbedColour);
        return await interaction.reply({ embeds: [userEmbed] });
    }
};
