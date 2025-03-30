import { EmbedBuilder } from 'discord.js';
import { abEmbedColour } from '../storage/consts.js';
import { quote as quoteDB } from '../db/models/quote.js';
import { guildSettings } from '../db/models/guild-settings.js';
import { schedule } from 'node-cron';

export function QuoteOfTheDay(client) {
    schedule('0 0 * * *', async () => {
        const enabledGuilds = await guildSettings.findAll({
            where: { qotdToggle: true },
            attributes: ['guildID', 'qotdChannelID']
        });

        const channels = enabledGuilds
            .filter(guild => guild.qotdChannelID)
            .map(guild => guild.qotdChannelID);

        const quoteList = await quoteDB.findAll({attributes: ['id']});
        const random = crypto.getRandomValues(new Uint32Array(1));

        let quoteID = quoteList[random[0] % quoteList.length].id;

        const quote = await quoteDB.findOne({where: {id: quoteID}});

        let userSubmitter = await client.users.fetch(quote.submitter);

        const quoteEmbed = new EmbedBuilder()
            .setAuthor({name: quote.author, iconURL: quote.authorImage})
            .setDescription(quote.quote)
            .setColor(abEmbedColour)
            .setFooter({text: `- ${quote.year}\nSubmitted by ${userSubmitter.username}`});

        for (const channel of channels) {
            let qotdChannel = client.channels.cache.get(channel);
            await qotdChannel.send({ content: 'New Quote of the Day!', embeds: [quoteEmbed ]});
        }
    });
}
