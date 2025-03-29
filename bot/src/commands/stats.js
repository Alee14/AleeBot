import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { commandUsages } from '../models/command-usages.js';
import { abEmbedColour } from '../storage/consts.js';

export default {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows how many times you executed a command.'),
    async execute(interaction) {
        let cmdUsage = await commandUsages.findAll({ where: { userID: interaction.user.id } });
        const totalCommands = cmdUsage.length;
        const guildCommands = cmdUsage.filter(cmd => cmd.guildID === interaction.guild.id).length;

        const statsEmbed = new EmbedBuilder()
            .setAuthor({ name: `Stats for ${interaction.user.username}`, iconURL: interaction.client.user.avatarURL() })
            .addFields(
                { name: 'Total Commands Executed', value: totalCommands.toString() },
                { name: 'Total Commands Executed in this Guild', value: guildCommands.toString() }
            )
            .setColor(abEmbedColour);

        return await interaction.reply({ embeds: [statsEmbed] });
    }
};
