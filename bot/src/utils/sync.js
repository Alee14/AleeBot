import { quote, pendingQuote } from '../db/models/quote.js';
import { guildSettings } from '../db/models/guild-settings.js';
import { commandUsages } from '../db/models/command-usages.js';
import { blacklistGuild, blacklistUser } from '../db/models/blacklist.js';

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

    blacklistUser.sync().then(() => {
        console.log('[>] Blacklist user database synced!');
    });

    blacklistGuild.sync().then(() => {
        console.log('[>] Blacklist guild database synced!');
    });
}
