import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('User settings for AleeBot.'),
    async execute(interaction) {
        return await interaction.reply(`**PONG!** :ping_pong: ${Math.round(interaction.client.ws.ping)} ms`);
    }
};
