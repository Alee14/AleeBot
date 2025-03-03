import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('attack')
        .setDescription('You don\'t like someone? Attack them!')
        .addStringOption(option =>
            option
                .setName('target')
                .setDescription('Enter the target you want to attack.')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getString('target');

        return await interaction.reply(`${interaction.user.displayName} :right_facing_fist: ${target}`);
    }
};
