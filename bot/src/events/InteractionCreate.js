import { Events, MessageFlags } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (e) {
            console.error(e);
            await interaction.reply({ content: `Something went wrong. Send the following error message to Alee:\n\`\`\`${e}\`\`\``, flags: MessageFlags.Ephemeral });
        }
    }
};
