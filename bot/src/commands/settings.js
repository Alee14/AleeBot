import {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder} from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';
export default {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Settings for AleeBot.'),
    async execute(interaction) {
        const settingEmbed = new EmbedBuilder()
            .setAuthor({ name: 'AleeBot Settings', iconURL: interaction.client.user.avatarURL() })
            .setDescription(`To configure AleeBot, visit ${process.env.SETTINGS_URL}`)
            .setColor(abEmbedColour);

        let settingButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Configure')
                    .setURL(process.env.SETTINGS_URL)
            );

        return await interaction.reply({ embeds: [settingEmbed], components: [settingButtons] });

    }
};
