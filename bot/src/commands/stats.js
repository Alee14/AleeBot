import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { commandUsages } from '../models/command-usages.js';
import { abEmbedColour } from '../storage/consts.js';
import { quote } from '../models/quote.js';

export default {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows statistics of your interaction with AleeBot.'),
    async execute(interaction) {
        const cmdUsage = await commandUsages.findAll({ where: { userID: interaction.user.id } });
        const quoteSubmitted = await quote.findAll({ where: { submitter: interaction.user.id } });

        const totalCommands = cmdUsage.length;
        const guildCommands = cmdUsage.filter(cmd => cmd.guildID === interaction.guild.id).length;
        const totalQuotes = quoteSubmitted.length;

        const statsEmbed = new EmbedBuilder()
            .setAuthor({ name: `AleeBot Stats for ${interaction.user.displayName}`, iconURL: interaction.client.user.avatarURL() })
            .addFields(
                { name: 'Total Commands Executed (Global)', value: totalCommands.toString() },
                { name: 'Total Commands Executed (Guild)', value: guildCommands.toString() },
                { name: 'Total Quotes Submitted', value: totalQuotes.toString() }
            )
            .setColor(abEmbedColour);

        return await interaction.reply({ embeds: [statsEmbed] });
    }
};
