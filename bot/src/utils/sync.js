import { quote, pendingQuote } from '../models/quote.js';
import { guildSettings } from '../models/guild-settings.js';

export function syncDB() {
    quote.sync().then(() => {
        console.log('[>] Quote database synced!');
    });

    pendingQuote.sync().then(() => {
        console.log('[>] Pending Quote database synced!');
    });

    guildSettings.sync().then(() => {
        console.log('[>] Guild database synced!');
    });
}
