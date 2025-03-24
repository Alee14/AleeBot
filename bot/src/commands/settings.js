import { PermissionFlagsBits, SlashCommandBuilder, MessageFlags, EmbedBuilder } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';
import { abEmbedColour } from '../storage/consts.js';
export default {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Settings for AleeBot.')
        .setContexts(0)
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Sets the settings for this guild.')
                .addChannelOption(option =>
                    option
                        .setName('log')
                        .setDescription('Log channel.'))
                .addChannelOption(option =>
                    option
                        .setName('suggestion')
                        .setDescription('Suggestion channel.'))
                .addChannelOption(option =>
                    option
                        .setName('qotd')
                        .setDescription('Quote of the Day channel.'))
                .addBooleanOption(option =>
                    option
                        .setName('qotdtoggle')
                        .setDescription('Toggle Quote of the Day.'))
                .addBooleanOption(option =>
                    option
                        .setName('llmtoggle')
                        .setDescription('Toggle LLM Chatbot.')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Clears all settings for this guild.')),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild) &&
            !interaction.member.permissions.has(PermissionFlagsBits.Administrator) &&
            interaction.user.id !== interaction.guild.ownerId) return await interaction.reply({ content: 'You do not have the permission to manage this guild.', flags: MessageFlags.Ephemeral });
        const guildSetting = await guildSettings.findOne({ where: { guildID: interaction.guild.id } });
        if (interaction.options.getSubcommand() === 'clear') {
            await guildSettings.update({
                logChannelID: null,
                suggestionsChannelID: null,
                qotdChannelID: null,
                qotdToggle: null,
                ollamaEnabled: null
            }, { where: { guildID: interaction.guild.id } });
            return await interaction.reply({ content: 'Cleared all settings for this guild.', flags: MessageFlags.Ephemeral });
        }

        const guildEmbed = new EmbedBuilder()
            .setAuthor({ name: 'AleeBot Guild Settings', iconURL: interaction.client.user.avatarURL() })
            .setDescription('Settings for this guild.')
            .setColor(abEmbedColour);

        if (!guildSetting) await guildSettings.create({ guildID: interaction.guild.id });


        // Handle clearing settings
        if (areAllSettingsEmpty(interaction)) {
            guildEmbed.addFields(
                { name: 'Logging', value: guildSetting?.logChannelID ? `<#${guildSetting.logChannelID}>` : 'N/A', inline: true },
                { name: 'Suggestions', value: guildSetting?.suggestionsChannelID ? `<#${guildSetting.suggestionsChannelID}>` : 'N/A', inline: true },
                { name: 'QOTD Channel', value: guildSetting?.qotdChannelID ? `<#${guildSetting.qotdChannelID}>` : 'N/A', inline: true },
                { name: 'LLM Chatbot', value: guildSetting?.ollamaEnabled ? 'Enabled' : 'Disabled', inline: true },
                { name: 'Quote of the Day', value: guildSetting?.qotdToggle ? 'Enabled' : 'Disabled', inline: true }
            );
            return await interaction.reply({ embeds: [guildEmbed], flags: MessageFlags.Ephemeral });
        }

        // Process each setting type
        await updateChannelSetting(interaction, guildEmbed, 'log', 'logChannelID', 'Logging');
        await updateChannelSetting(interaction, guildEmbed, 'suggestion', 'suggestionsChannelID', 'Suggestions');
        await updateChannelSetting(interaction, guildEmbed, 'qotd', 'qotdChannelID', 'QOTD Channel');
        await updateBooleanSetting(interaction, guildEmbed, 'qotdtoggle', 'qotdToggle', 'Quote of the Day');
        await updateBooleanSetting(interaction, guildEmbed, 'llmtoggle', 'ollamaEnabled', 'LLM Chatbot');

        return await interaction.reply({ embeds: [guildEmbed], flags: MessageFlags.Ephemeral });
    }
};

// Helper functions
function areAllSettingsEmpty(interaction) {
    return !interaction.options.getChannel('log') &&
        !interaction.options.getChannel('suggestion') &&
        !interaction.options.getChannel('qotd') &&
        interaction.options.getBoolean('qotdtoggle') === null &&
        interaction.options.getBoolean('llmtoggle') === null;
}

async function updateChannelSetting(interaction, embed, optionName, dbField, displayName) {
    const channel = interaction.options.getChannel(optionName);
    if (channel) {
        embed.addFields({ name: displayName, value: `${channel}`, inline: true });
        await guildSettings.update({ [dbField]: channel.id }, { where: { guildID: interaction.guild.id } });
    }
}

async function updateBooleanSetting(interaction, embed, optionName, dbField, displayName) {
    const value = interaction.options.getBoolean(optionName);
    if (value !== null) {
        embed.addFields({ name: displayName, value: value ? 'Enabled' : 'Disabled', inline: true });
        await guildSettings.update({ [dbField]: value }, { where: { guildID: interaction.guild.id } });
    }
}
