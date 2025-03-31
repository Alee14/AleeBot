import { SlashCommandBuilder, EmbedBuilder, version } from 'discord.js';
import { hostname, platform, release } from 'os';
import { Sequelize } from 'sequelize';
import { sequelize } from '../utils/sequelize.js';
import { abEmbedColour } from '../storage/consts.js';

export default {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows information about the host.'),
    async execute(interaction) {
        const hostEmbed = new EmbedBuilder()
            .setTitle('Information on AleeBot\'s Host')
            .addFields(
                { name: 'OS Hostname: ', value: hostname(), inline: true },
                { name: 'OS Version: ', value: release(), inline: true },
                { name: 'OS Platform: ', value: platform(), inline: true },
                { name: 'NodeJS Version: ', value: process.versions.node, inline: true },
                { name: 'Discord.JS Version: ', value: version, inline: true },
                { name: 'Sequelize Version: ', value: Sequelize.version, inline: true },
                { name: 'Database Type: ', value: sequelize.getDialect(), inline: true }
            )
            .setColor(abEmbedColour);
        return await interaction.reply({ embeds: [hostEmbed] });
    }
};
