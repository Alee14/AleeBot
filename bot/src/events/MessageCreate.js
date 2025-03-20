import { Events } from 'discord.js';
import { ChatBot } from '../plugins/chatbot.js';
import { Evaluation } from '../plugins/eval.js';

export default {
    name: Events.MessageCreate,
    async execute(msg) {
        if (!msg.client.application?.owner) await msg.client.application?.fetch();
        if (msg.author.bot) return;
        if (!msg.guild) return;

        const args = msg.content.slice(`${msg.client.user}`.length).trim();

        if (msg.mentions.has(msg.client.user)) {
            if (args === 'execute') {
                await Evaluation(msg);
            } else {
                await ChatBot(msg, args);
            }
        }
    }
};
