import { EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';

export default {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('User settings for AleeBot.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('guild')
                .setDescription('Change settings for the guild.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Change settings for the user.')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'guild') {
            //if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) return await interaction.reply({ content: 'You do not have the permission to manage this guild.', flags: MessageFlags.Ephemeral });

            const logging = new ButtonBuilder()
                .setCustomId('logging')
                .setLabel('Logging')
                .setStyle(ButtonStyle.Primary);

            const suggestions = new ButtonBuilder()
                .setCustomId('suggestions')
                .setLabel('Suggestions')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder()
                .addComponents(logging, suggestions);

            const guildEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot Guild Settings', iconURL: interaction.client.user.avatarURL() })
                .setDescription('Select the options')
                .addFields(
                    { name: 'Logging', value: 'logchannel', inline: true },
                    { name: 'Suggestions', value: 'channel', inline: true },
                    { name: 'LLM Chatbot', value: 'Enabled', inline: true },
                    { name: 'Quote of the Day', value: 'logchannel', inline: true },
                    { name: 'QOTD Channel', value: 'logchannel', inline: true }
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
                    await interaction.reply({ content: 'Clicked on logging' });
                }

                if (interaction.customId === 'suggestions') {
                    await interaction.reply({ content: 'Clicked on suggestions' });
                }
            });
        }

        if (interaction.options.getSubcommand() === 'user') {
            const userEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot User Settings', iconURL: interaction.client.user.avatarURL() })
                .setDescription('Select the options')
                .addFields(
                    { name: 'Language', value: 'logchannel', inline: true },
                    { name: 'Location', value: 'channel', inline: true }
                )
                .setColor(abEmbedColour);

            return await interaction.reply({ embeds: [userEmbed] });
        }
    }
};
