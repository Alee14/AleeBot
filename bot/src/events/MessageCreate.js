import { Events } from 'discord.js';
import { ollama } from '../utils/ollama.js';
import { ollamaEnabled, ollamaModel } from '../storage/consts.js';

export default {
    name: Events.MessageCreate,
    async execute(msg) {
        if (!msg.client.application?.owner) await msg.client.application?.fetch();
        if (msg.author.bot) return;
        if (!msg.guild) return;

        const args = msg.content.slice(`<@${msg.client.user.id}>`.length).trim();

        if (msg.mentions.has(msg.client.user)) {
            if (!ollamaEnabled) return msg.reply('Sorry, this feature has been turned off.');
            if (!args) return msg.reply('Sorry? What was that?');

            try {
                const response = await ollama.chat({
                    model: ollamaModel,
                    messages: [{ role: 'user', content: args }],
                });

                let content = response.message.content;
                content = content.replace(/<think>.*?<\/think>/g, '');

                if (content.length > 2000) {
                    const chunks = content.match(/[\s\S]{1,2000}/g) || [];
                    for (const chunk of chunks) {
                        await msg.reply({ content: chunk });
                    }
                } else {
                    await msg.reply({ content });
                }

            } catch (err) {
                console.error(err);
                await msg.reply('Something went wrong.');
            }
        }
    }
};
