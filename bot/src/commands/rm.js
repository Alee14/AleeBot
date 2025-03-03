import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('rm')
        .setDescription('Purges messages.')
        .addNumberOption(option =>
            option
                .setName('amount')
                .setDescription('Enter the amount of messages you want to delete.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const amount = interaction.options.getNumber('amount');

        if (amount > 100) return interaction.reply('Put a number less than 100.');

        return await interaction.channel.bulkDelete(amount)
            .then( (messages) => interaction.reply(`Deleted ${messages.size} messages.`));
    }
};
