import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(interaction) {
        return await interaction.reply(`**PONG!** :ping_pong: ${Math.round(interaction.client.ws.ping)} ms`);
    }
};
