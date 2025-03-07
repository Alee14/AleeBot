import {
    ActionRowBuilder,
    MessageFlags,
    ModalBuilder,
    SlashCommandBuilder,
    TextInputBuilder,
    TextInputStyle,
    EmbedBuilder
} from 'discord.js';
import { abEmbedColour, featureSuggestChannel } from '../storage/consts.js';

export default {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggest something either for AleeBot or this server.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('feature')
                .setDescription('Suggest a feature in AleeBot.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('guild')
                .setDescription('Suggest something for this server.')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'feature') {
            const modal = new ModalBuilder()
                .setCustomId(`suggest-${interaction.user.id}`)
                .setTitle('Suggest a feature for AleeBot');

            const featureText = new TextInputBuilder()
                .setCustomId('feature')
                .setLabel('Suggest the feature you want')
                .setMaxLength(200)
                .setPlaceholder('Feature')
                .setStyle(TextInputStyle.Paragraph);

            const firstActionRow = new ActionRowBuilder().addComponents(featureText);

            modal.addComponents(firstActionRow);

            await interaction.showModal(modal);

            const filter = (interaction) => interaction.customId === `suggest-${interaction.user.id}`;

            interaction.awaitModalSubmit({ filter, time: 1000 * 1200 })
                .then(async (modalInteraction) => {
                    const feature = modalInteraction.fields.getTextInputValue('feature');

                    modalInteraction.client.channels.cache.get(featureSuggestChannel).send({ embeds: [
                        new EmbedBuilder()
                            .setTitle('AleeBot Feature Suggestion')
                            .setDescription(`This is an AleeBot feature suggested from ${modalInteraction.user.username}.`)
                            .addFields({ name: 'Suggestion Contents', value: feature })
                            .setColor(abEmbedColour)
                            .setFooter({ text: `Sending from ${modalInteraction.guild.name}`, iconURL: modalInteraction.guild.iconURL() })
                    ]});

                    return await modalInteraction.reply({content: 'Your suggestion has been sent.', flags: MessageFlags.Ephemeral});
                })
                .catch((err) => {
                    console.error(err);
                });

        }
    }
};
