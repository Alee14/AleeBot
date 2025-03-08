import {
    EmbedBuilder,
    MessageFlags,
    PermissionFlagsBits,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType,
    ChannelType,
    ChannelSelectMenuBuilder
} from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';
import { guildSettings } from '../models/guild-settings.js';

export default {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('User settings for AleeBot.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('guild')
                .setDescription('Change settings for the guild.')),
    // .addSubcommand(subcommand =>
    //     subcommand
    //         .setName('user')
    //         .setDescription('Change settings for the user.')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'guild') {
            if (!interaction.guild) return await interaction.reply({ content: 'This command can only be run in a guild.' });
            //if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) return await interaction.reply({ content: 'You do not have the permission to manage this guild.', flags: MessageFlags.Ephemeral });

            const guildSetting = await guildSettings.findOne({ where: { guildID: interaction.guild.id } });

            if (!guildSetting) {
                await guildSettings.create({ guildID: interaction.guild.id });
            }

            const logMenu = new ChannelSelectMenuBuilder()
                .setCustomId('logMenu')
                .setPlaceholder('Select a channel')
                .setChannelTypes(ChannelType.GuildText);

            const logging = new ButtonBuilder()
                .setCustomId('logging')
                .setLabel('Logging')
                .setStyle(ButtonStyle.Primary);

            const suggestions = new ButtonBuilder()
                .setCustomId('suggestions')
                .setLabel('Suggestions')
                .setStyle(ButtonStyle.Primary);

            const qotdChannel = new ButtonBuilder()
                .setCustomId('qotdChannel')
                .setLabel('QOTD Channel')
                .setStyle(ButtonStyle.Primary);

            const llmChatbot = new ButtonBuilder()
                .setCustomId('llmChatbot')
                .setLabel('LLM Chatbot')
                .setStyle(ButtonStyle.Primary);

            const qotdToggle = new ButtonBuilder()
                .setCustomId('qotdToggle')
                .setLabel('QOTD Toggle')
                .setStyle(ButtonStyle.Primary);

            const done = new ButtonBuilder()
                .setCustomId('done')
                .setLabel('Suggestions')
                .setStyle(ButtonStyle.Success);

            const row = new ActionRowBuilder()
                .addComponents(logging, suggestions, qotdChannel, llmChatbot, qotdToggle);

            const row2 = new ActionRowBuilder()
                .addComponents(logMenu);

            const guildEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot Guild Settings', iconURL: interaction.client.user.avatarURL() })
                .setDescription('Select the options')
                .addFields(
                    { name: 'Logging', value: guildSetting?.logChannelID ? `<#${guildSetting.logChannelID}>` : 'N/A', inline: true },
                    { name: 'Suggestions', value: guildSetting?.suggestionsChannelID ? `<#${guildSetting.suggestionsChannelID}>` : 'N/A', inline: true },
                    { name: 'QOTD Channel', value: guildSetting?.qotdChannelID ? `<#${guildSetting.qotdChannelID}>` : 'N/A', inline: true },
                    { name: 'LLM Chatbot', value: guildSetting?.ollamaEnabled ? 'Enabled' : 'Disabled', inline: true },
                    { name: 'Quote of the Day', value: guildSetting?.qotdToggle ? 'Enabled' : 'Disabled', inline: true }
                )
                .setColor(abEmbedColour);

            const guildSetup = await interaction.reply({ embeds: [guildEmbed], components: [row] });

            const filter = (i) => i.user.id === interaction.user.id;

            const guildCollector = guildSetup.createMessageComponentCollector({
                componentType: ComponentType.Button,
                filter,
                time: 1000 * 120
            });

            guildCollector.on('collect', async (interaction) => {
                if (interaction.customId === 'logging') {
                    await interaction.reply({ components: [row2] });

                    const logMenuInteraction = await interaction.channel.awaitMessageComponent({
                        componentType: ComponentType.ChannelSelectMenu,
                        filter: (i) => i.user.id === interaction.user.id,
                        time: 1000 * 120
                    });

                    if (logMenuInteraction.customId === 'logMenu') {
                        await logMenuInteraction.reply({ content: `Selected <#${logMenuInteraction.values}>` });
                        await guildSettings.update({ logChannelID: logMenuInteraction.values[0] }, { where: { guildID: interaction.guild.id } });
                    }

                    const logSetting = await guildSettings.findOne({ where: { guildID: interaction.guild.id } });
                    guildEmbed.spliceFields(0, 1, { name: 'Logging', value: logSetting?.logChannelID ? `<#${logSetting.logChannelID}>` : 'N/A', inline: true });
                    await interaction.editReply({ embeds: [guildEmbed], components: [row] });

                    await interaction.deleteReply();
                }

                if (interaction.customId === 'suggestions') {
                    await interaction.reply({ content: 'Clicked on suggestions' });
                }
            });
        }

        // if (interaction.options.getSubcommand() === 'user') {
        //     const userEmbed = new EmbedBuilder()
        //         .setAuthor({ name: 'AleeBot User Settings', iconURL: interaction.client.user.avatarURL() })
        //         .setDescription('Select the options')
        //         .addFields(
        //             { name: 'Language', value: 'logchannel', inline: true },
        //             { name: 'Location', value: 'channel', inline: true }
        //         )
        //         .setColor(abEmbedColour);
        //
        //     return await interaction.reply({ embeds: [userEmbed] });
        // }
    }
};
