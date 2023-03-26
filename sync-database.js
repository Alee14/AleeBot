const quoteDB = require("./models/quote");
const guildDB = require ('./models/guild-settings');
quoteDB.sync({alter: true}).then(() => {
    console.log('Quote database synced!')
});

guildDB.sync({alter: true}).then(() => {
    console.log('Guild database synced!')
});
