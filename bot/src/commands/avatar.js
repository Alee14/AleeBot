import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Gives the profile picture of the user.')
        .addUserOption(option =>
            option
                .setName('username')
                .setDescription('The user to get the avatar of.'))
        .addBooleanOption(option =>
            option
                .setName('server')
                .setDescription('Gets the member\'s server profile picture.')),

    async execute(interaction) {
        const username = interaction.options.getUser('username') || interaction.user;
        const server = interaction.options.getBoolean('server');

        if (username && server) {
            const member = interaction.guild.members.cache.get(username.id);
            return await interaction.reply(member.avatarURL({ dynamic: true, format: 'png', size: 1024 }));
        } else if (server) {
            return await interaction.reply(interaction.member.avatarURL({ dynamic: true, format: 'png', size: 1024 }));
        }

        return await interaction.reply(username.avatarURL({ dynamic: true, format: 'png', size: 1024 }));
    }
};
