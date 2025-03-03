import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { quote as quoteDB } from '../models/quote.js';
export default {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('It gives you a quote.')
        .addNumberOption(option =>
            option
                .setName('id')
                .setDescription('Enter the quote ID to get a specific quote.')),
    async execute(interaction) {
        let quoteID = interaction.options.getNumber('id');

        if (!quoteID) {
            const quoteList = await quoteDB.findAll({ attributes: ['id'] });
            const random = crypto.getRandomValues(new Uint32Array(1));
            quoteID = quoteList[random[0] % quoteList.length].id;
        }

        const quote = await quoteDB.findOne({ where: { id: quoteID } });

        if (quote) {
            let userSubmitter = await interaction.client.users.fetch(quote.submitter);
            const quoteEmbed = new EmbedBuilder()
                .setAuthor({ name: quote.author, iconURL: quote.authorImage })
                .setDescription(quote.quote)
                .setColor('#1fd619')
                .setFooter({ text: `- ${quote.year}\nSubmitted by ${userSubmitter.username}` });

            return await interaction.reply({ embeds: [quoteEmbed] });
        } else {
            return await interaction.reply('Cannot find quote, specify the correct quote id.');
        }
    }
};
