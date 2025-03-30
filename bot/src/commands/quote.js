import {
    SlashCommandBuilder,
    EmbedBuilder,
    MessageFlags,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle, ActionRowBuilder
} from 'discord.js';
import { pendingQuote, quote as quoteDB } from '../db/models/quote.js';
import { abEmbedColour } from '../storage/consts.js';
// import { setTimeout as wait } from 'node:timers/promises';
//
// let setupMessage = 'Welcome to the AleeBot Quote Setup!\n';
// setupMessage += 'Please follow these rules when submitting quotes:\n';
// setupMessage += '```1. No offensive content (NSFW, Racism, etc).\n';
// setupMessage += '2. Do not send any personal information.\n';
// setupMessage += '3. Only send noteworthy quotes.```\n';
// setupMessage += 'We reserve the right to reject any quotes that do not meet our criteria.\n';

export default {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('It gives you a quote.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('Gives you a quote.')
                .addNumberOption(option =>
                    option
                        .setName('id')
                        .setDescription('Enter the quote ID to get a specific quote.')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Got a quote? Add it here!')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'add') {
            const modal = new ModalBuilder()
                .setCustomId(`newQuote-${interaction.user.id}`)
                .setTitle('New Quote for AleeBot');

            const author = new TextInputBuilder()
                .setCustomId('author')
                .setLabel('Provide the name of the author')
                .setMaxLength(50)
                .setPlaceholder('Name')
                .setStyle(TextInputStyle.Short);

            const authorImage = new TextInputBuilder()
                .setCustomId('authorImage')
                .setLabel('Submit the image of the author')
                .setMaxLength(100)
                .setMinLength(4)
                .setPlaceholder('Image URL (512x512) or (128x128)')
                .setStyle(TextInputStyle.Short);

            const quote = new TextInputBuilder()
                .setCustomId('quote')
                .setLabel('Enter the quote')
                .setMaxLength(200)
                .setMinLength(5)
                .setPlaceholder('Quote')
                .setStyle(TextInputStyle.Paragraph);

            const year = new TextInputBuilder()
                .setCustomId('year')
                .setLabel('Specify the year which the quote originates')
                .setMaxLength(4)
                .setPlaceholder('Year')
                .setStyle(TextInputStyle.Short);

            const firstActionRow = new ActionRowBuilder().addComponents(author);
            const secondActionRow = new ActionRowBuilder().addComponents(authorImage);
            const thirdActionRow = new ActionRowBuilder().addComponents(quote);
            const fourthActionRow = new ActionRowBuilder().addComponents(year);

            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

            await interaction.showModal(modal);

            const filter = (interaction) => interaction.customId === `newQuote-${interaction.user.id}`;

            interaction.awaitModalSubmit({ filter, time: 1000 * 1200 })
                .then(async (modalInteraction) => {
                    const author = modalInteraction.fields.getTextInputValue('author');
                    const authorImage = modalInteraction.fields.getTextInputValue('authorImage');
                    const quote = modalInteraction.fields.getTextInputValue('quote');
                    const year = modalInteraction.fields.getTextInputValue('year');

                    try {
                        new URL(authorImage);
                    } catch {
                        return modalInteraction.reply({
                            content: 'Error: Author image must be a valid URL.',
                            flags: MessageFlags.Ephemeral
                        });
                    }

                    if (!authorImage.match(/\.(jpeg|jpg|png|webp)$/i)) {
                        return modalInteraction.reply({
                            content: 'Error: Author image URL must end with a valid image extension (jpeg, jpg, png, webp).',
                            flags: MessageFlags.Ephemeral
                        });
                    }

                    if (isNaN(year) || year.trim() === '' || !Number.isInteger(Number(year))) {
                        return modalInteraction.reply({
                            content: 'Error: Year must be a number.',
                            flags: MessageFlags.Ephemeral
                        });
                    }

                    await pendingQuote.create({
                        author: author,
                        authorImage: authorImage,
                        quote: quote,
                        year: year,
                        submitterAuthor: modalInteraction.user.username,
                        submitterID: modalInteraction.user.id
                    }).catch((err) => {
                        console.error(err);
                        return modalInteraction.reply({ content: 'Something went wrong.', flags: MessageFlags.Ephemeral });
                    });

                    return await modalInteraction.reply({ content: 'Sending this quote for manual approval.', flags: MessageFlags.Ephemeral });
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        if (interaction.options.getSubcommand() === 'get') {
            let quoteID = interaction.options.getNumber('id');

            if (!quoteID) {
                const quoteList = await quoteDB.findAll({ attributes: ['id'] });
                const random = crypto.getRandomValues(new Uint32Array(1));

                if (quoteList.length === 0) return await interaction.reply({ content: 'No quotes are currently in the database. You can add one by doing `/quote add`.', flags: MessageFlags.Ephemeral });
                quoteID = quoteList[random[0] % quoteList.length].id;
            }

            const quote = await quoteDB.findOne({ where: { id: quoteID } });

            if (quote) {
                let userSubmitter = await interaction.client.users.fetch(quote.submitter);
                const quoteEmbed = new EmbedBuilder()
                    .setAuthor({ name: quote.author, iconURL: quote.authorImage })
                    .setDescription(quote.quote)
                    .setColor(abEmbedColour)
                    .setFooter({ text: `- ${quote.year}\nSubmitted by ${userSubmitter.username}` });

                return await interaction.reply({ embeds: [quoteEmbed] });
            } else {
                return await interaction.reply({ content: 'Cannot find quote. Specify the correct quote ID.', flags: MessageFlags.Ephemeral });
            }
        }
    }
};
