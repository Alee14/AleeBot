import { SlashCommandBuilder, EmbedBuilder, version } from 'discord.js';
import { hostname, platform, release } from 'os';

export default {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows information about the host.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Information on AleeBot\'s Host')
            .addFields(
                { name: 'OS Hostname: ', value: hostname(), inline: true },
                { name: 'NodeJS Version: ', value: process.versions.node, inline: true },
                { name: 'Discord.JS Version: ', value: version, inline: true },
                { name: 'OS Platform: ', value: platform(), inline: true },
                { name: 'OS Version: ', value: release(), inline: true }
            )
            .setColor('#1fd619');
        return await interaction.reply({ embeds: [embed] });
    }
};
