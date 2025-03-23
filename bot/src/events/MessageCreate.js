import { Events } from 'discord.js';
import { ChatBot } from '../plugins/chatbot.js';
import { prefix, prefixNotice } from '../storage/consts.js';

export default {
    name: Events.MessageCreate,
    async execute(msg) {
        if (!msg.client.application?.owner) await msg.client.application?.fetch();
        if (msg.author.bot) return;
        if (!msg.guild) return;
        if (msg.mentions.everyone) return;

        const args = msg.content.slice(`${msg.client.user}`.length).trim();

        if (msg.mentions.has(msg.client.user)) {
            if (!args) return;
            await ChatBot(msg, args);
        }

        if (prefixNotice && msg.content.startsWith(prefix)) {
            return await msg.reply('# :warning: **AleeBot no longer uses the prefix system.**\n## Please use the new slash command system.');
        }
    }
};
