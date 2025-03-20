import { SlashCommandBuilder, time, TimestampStyles } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('timer')
        .setDescription('Reminds you for something after a certain amount of time.')
        .addIntegerOption(option =>
            option
                .setName('seconds')
                .setDescription('Seconds to wait for.'))
        .addIntegerOption(option =>
            option
                .setName('minutes')
                .setDescription('Minutes to wait for.'))
        .addIntegerOption(option =>
            option
                .setName('hours')
                .setDescription('Hours to wait for.'))
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Enter the message you want to be reminded of.')),
    async execute(interaction) {
        let timer = 0;
        const seconds = interaction.options.getInteger('seconds') || 0;
        const minutes = interaction.options.getInteger('minutes') || 0;
        const hours = interaction.options.getInteger('hours') || 0;
        const message = interaction.options.getString('message');
        const content = message ? `Reason: \`\`\`\n${message}\n\`\`\`` : '';
        if (!seconds && !minutes && !hours) return await interaction.reply({ content: 'Please provide a time to wait for.', ephemeral: true });

        timer = seconds + (minutes * 60) + (hours * 3600);

        if (timer > 0) {
            const date = new Date();
            date.setSeconds(date.getSeconds() + timer);
            const timeString = time(date, TimestampStyles.RelativeTime);
            await interaction.reply(`Timer set! Will remind you ${timeString}`);
        }

        setTimeout(async function(){
            if (interaction.guild) {
                let remindChannel = interaction.client.channels.cache.get(interaction.channel.id);
                if (!remindChannel) return;
                return await remindChannel.send({ content: `${interaction.user}, You have been reminded.${message ? '\n\n' + content : ''}` });
            } else {
                return await interaction.user.send({ content: `You have been reminded.${message ? '\n\n' + content : ''}` });
            }
        }, timer * 1000);
    }
};
