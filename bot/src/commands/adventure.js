// The plan for this command is that the user can select a story, then the bot sends the story that the user selected, and it will be interactive
// so it will be like an adventure story, and it will have multiple paths that the user can select.
import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('adventure')
        .setDescription('Select an interactive story'),
    async execute(interaction) {
        return await interaction.reply('Hello world');
    }
};
