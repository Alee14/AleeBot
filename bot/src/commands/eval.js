import { MessageFlags, SlashCommandBuilder } from 'discord.js';
import { inspect } from 'util';
import { userWhitelist } from '../storage/consts.js';

export default {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Evaluates code'),
    async execute(interaction) {
        if (!userWhitelist.includes(interaction.user.id)) return await interaction.reply({ content: 'Nope! You don\'t have permission to use this command.', flags: MessageFlags.Ephemeral });
        await interaction.reply('You have entered evaluation mode. Enter the code for AleeBot to evaluate.\nType in `exit` to exit evaluation mode.');

        let evaled;
        let remove;

        const filter = (i) => i.author.id === interaction.user.id;

        const collector = interaction.channel.createMessageCollector({
            filter,
            time: 1000 * 600
        });

        collector.on('collect', async (msg) => {
            if (msg.content.toLowerCase() === 'exit') return collector.stop();

            try {
                remove = (text) => {
                    if (typeof(text) === 'string') {
                        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
                    } else {
                        return text;
                    }
                };

                evaled = await eval(msg.content);

                if (typeof evaled !== 'string') {
                    evaled = inspect(evaled);
                }

            } catch (err) {
                return await msg.reply(`**Error:**\n\`\`\`\n${err.stack}\n\`\`\``);
            }

            try {
                return await msg.reply(`**Output:**\n\`\`\`js\n${remove(evaled)}\n\`\`\``);
            } catch (err) {
                return await msg.reply(`**Error:**\n\`\`\`\n${err.stack}\n\`\`\``);
            }

        });

        collector.on('end', async () => {
            return await interaction.followUp('Exiting evaluation mode.');
        });
    }
};
