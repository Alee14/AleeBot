import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Gives the profile picture of the user.')
        .addUserOption(option =>
            option
                .setName('username')
                .setDescription('The user to get the avatar of.')
                .setRequired(false)),

    async execute(interaction) {
        const username = interaction.options.getUser('username');

        if(!username) {
            await interaction.reply(interaction.user.avatarURL({ dynamic: true, format: 'png', size: 1024 }));
        } else {
            await interaction.reply(username.avatarURL({ dynamic: true, format: 'png', size: 1024 }));
        }
    }
};
