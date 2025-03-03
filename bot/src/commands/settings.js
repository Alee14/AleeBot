import { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

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
            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) return await interaction.reply({ content: 'You do not have the permission to manage this guild.', flags: MessageFlags.Ephemeral  });

            return await interaction.reply('recieved');
        }

        if (interaction.options.getSubcommand() === 'user') {
            return;
        }
    }
};
