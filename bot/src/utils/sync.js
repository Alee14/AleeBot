import { quote, pendingQuote } from '../models/quote.js';
import { guildSettings } from '../models/guild-settings.js';


export function syncDB() {
    quote.sync({alter: true}).then(() => {
        console.log('[>] Quote database synced!');
    });

    pendingQuote.sync({alter: true}).then(() => {
        console.log('[>] Pending Quote database synced!');
    });

    guildSettings.sync({alter: true}).then(() => {
        console.log('[>] Guild database synced!');
    });
}
