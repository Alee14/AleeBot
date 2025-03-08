import { AttachmentBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('fetch')
        .setDescription('Fetches JSON data.')
        .addStringOption(option =>
            option
                .setName('url')
                .setDescription('Enter the URL you want to fetch.')
                .setRequired(true)),
    execute(interaction) {
        const url = interaction.options.getString('url');
        fetch(url)
            .then(response => response.json())
            .then(async data => {
                const dataString = JSON.stringify(data, null, 2);
                if (dataString.length === 0) {
                    return await interaction.reply('Received an empty response.');
                }

                if (dataString.length > 2000) {
                    const attachment = new AttachmentBuilder(Buffer.from(dataString, 'utf-8'), { name: 'messages.json' });
                    return await interaction.reply({ files: [attachment] });
                }

                return await interaction.reply(`\`\`\`json\n${dataString}\n\`\`\``);
            })
            .catch(async error => {
                console.error(error);
                return await interaction.reply(`An error occurred while fetching the URL data.\n\`\`\`js\n${error.stack}\`\`\``);
            });
    }
};
