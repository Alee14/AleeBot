import { ollamaGlobal, ollamaModel } from '../storage/consts.js';
import { ollama } from '../utils/ollama.js';
import { AttachmentBuilder } from 'discord.js';
import { guildSettings } from '../models/guild-settings.js';

export async function ChatBot(msg, args) {
    const guildSetting = await guildSettings.findOne({ where: { guildID: msg.guild.id } });

    if (!guildSetting.ollamaEnabled) return;
    if (!ollamaGlobal) return msg.reply('Sorry, the LLM chatbot feature has been turned off.');

    try {
        const loadingMessage = await msg.reply('Thinking...');

        const response = await ollama.chat({
            model: ollamaModel,
            messages: [{ role: 'user', content: args }],
        });

        let content = response.message.content;

        if (content.length > 2000) {
            const attachment = new AttachmentBuilder(Buffer.from(content, 'utf-8'), { name: 'output.txt' });
            return await loadingMessage.edit({ files: [attachment] });
        } else {
            return await loadingMessage.edit({ content });
        }

    } catch (err) {
        console.error(err);
        await msg.reply(`Something went wrong. [Submit an issue at the AleeBot repository.](<https://github.com/Alee14/AleeBot/issues>)\nMessage:\n\`\`\`${err.stack}\`\`\``);
    }
}
