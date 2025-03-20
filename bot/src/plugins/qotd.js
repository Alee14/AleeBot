import { EmbedBuilder } from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';
import { quote as quoteDB } from '../models/quote.js';

export async function QuoteOfTheDay(client) {
    const channels = ['606602551634296968', '341669022179262464'];
    const quoteList = await quoteDB.findAll({ attributes: ['id'] });
    const random = crypto.getRandomValues(new Uint32Array(1));

    if (quoteList.length === 0) return console.log('[i] No quotes are currently in the database.');

    let quoteID = quoteList[random[0] % quoteList.length].id;

    const quote = await quoteDB.findOne({ where: { id: quoteID } });

    let userSubmitter = await client.users.fetch(quote.submitter);

    const quoteEmbed = new EmbedBuilder()
        .setAuthor({ name: quote.author, iconURL: quote.authorImage })
        .setDescription(quote.quote)
        .setColor(abEmbedColour)
        .setFooter({ text: `- ${quote.year}\nSubmitted by ${userSubmitter.username}` });

    for (const channel of channels) {
        let qotdChannel = client.channels.cache.get(channel);
        await qotdChannel.send({ embeds: [quoteEmbed] });
    }
}
