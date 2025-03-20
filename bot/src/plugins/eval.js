import { inspect } from 'util';

export async function Evaluation(msg) {
    if (!['242775871059001344'].includes(msg.author.id)) return await msg.reply('Nope! You need the person who created this bot to use this command.');
    await msg.reply('You have entered evaluation mode. Enter the code for AleeBot to evaluate.\nType in `exit` to exit evaluation mode.');

    let evaled;
    let remove;

    const filter = (i) => i.author.id === msg.author.id;

    const collector = msg.channel.createMessageCollector({
        filter,
        time: 1000 * 600
    });

    collector.on('collect', async (msg) => {
        if (msg.content.toLowerCase() === 'exit') {
            return collector.stop();
        }

        try {
            remove = (text) => {
                if (typeof(text) === 'string') {
                    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
                } else {
                    return text;
                }
            };

            evaled = eval(msg.content);

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
        return await msg.reply('Exiting evaluation mode.');
    });
}
