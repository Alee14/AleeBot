import { quote, pendingQuote } from '../models/quote.js';
import { guildSettings } from '../models/guild-settings.js';
import { commandUsages } from '../models/command-usages.js';

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

    commandUsages.sync().then(() => {
        console.log('[>] Command usage database synced!');
    });
}
