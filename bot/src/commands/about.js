import {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    SlashCommandBuilder,
    ButtonStyle
} from 'discord.js';
import { readFileSync } from 'node:fs';
import { abEmbedColour } from '../storage/consts.js';

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Information about this bot.'),
    async execute(interaction) {
        const aboutEmbed = new EmbedBuilder()
            .setAuthor({ name: `AleeBot ${version}`, iconURL: interaction.client.user.avatarURL() })
            .addFields(
                { name: 'About AleeBot', value: 'AleeBot is an all-in-one bot that\'s made from the Discord.JS API!' },
                { name: 'Servers', value: `${interaction.client.guilds.cache.size}` },
                { name: 'License', value: 'GNU General Public License v3.0' },
                { name: 'Contributors', value:
                        '- <@297201585090723841> (Uptime command from 2.x)\n' +
                        '- <@236279900728721409> (Eval command from 2.x)'
                }
            )
            .setFooter({ text: '© Copyright 2017-2025 Andrew Lee & contributors' })
            .setColor(abEmbedColour);

        let aboutButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Source Code')
                    .setURL('https://github.com/Alee14/AleeBot'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Invite AleeBot')
                    .setURL(`https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}`),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Join Andrew Lee Projects')
                    .setURL('https://discord.gg/EFhRDqG')
            );

        return await interaction.reply({ embeds: [aboutEmbed], components: [aboutButtons] });
    }
};
