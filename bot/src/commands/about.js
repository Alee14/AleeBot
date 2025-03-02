import {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    SlashCommandBuilder,
    ButtonStyle
} from 'discord.js';
import { readFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Information about this bot'),
    async execute(interaction) {
        const aboutEmbed = new EmbedBuilder()
            .setAuthor({ name: `AleeBot ${version}`, iconURL: interaction.client.user.avatarURL() })
            .addFields(
                { name: 'About AleeBot', value: 'AleeBot is an all-in-one bot that\'s made from the Discord.JS API!' },
                { name: 'License', value: 'GNU General Public License v3.0' }
                //{ name: 'Contributors', value: '' }
            )
            .setFooter({ text: '© Copyright 2017-2025 Andrew Lee Projects' })
            .setColor('#1fd619');

        let Buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Source Code')
                    .setURL('https://github.com/alee14-projects/AleeBot'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Invite AleeBot')
                    .setURL('https://discord.com/oauth2/authorize?client_id=282547024547545109&permissions=68185158&scope=bot'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Join Andrew Lee Projects')
                    .setURL('https://discord.gg/EFhRDqG')
            );

        return await interaction.reply({embeds: [aboutEmbed], components: [Buttons]});
    }
};
