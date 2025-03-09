import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask AleeBot a question.')
        .addStringOption(option =>
            option
                .setName('question')
                .setDescription('The question you will be asking AleeBot.')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');

        const answers = [
            'Yes.',
            'Nope. Just kidding :P',
            'Definitely!',
            'No.',
            'Yep. Just kidding :P',
            'I doubt it.',
            'Maybe?',
            'Perhaps...',
            'I don\'t know?',
            'Can you ask me later? My CPU is overloading.',
            'Hmm let me think :thinking:',
        ];

        return await interaction.reply(
            `**${interaction.user.displayName}** asked:\n**${question}**\nMy answer:\n**${answers[Math.floor(Math.random() * answers.length)]}**`
        );
    }
};
