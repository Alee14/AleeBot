const { quote, pendingQuote } = require("./models/quote");
const guildDB = require ('./models/guild-settings');
quote.sync({alter: true}).then(() => {
    console.log('Quote database synced!')
});

pendingQuote.sync({alter: true}).then(() => {
    console.log('Pending Quote database synced!')
});

guildDB.sync({alter: true}).then(() => {
    console.log('Guild database synced!')
});
