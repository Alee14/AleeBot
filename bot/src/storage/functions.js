import { blacklistGuild, blacklistUser } from '../db/models/blacklist.js';
import { MessageFlags } from 'discord.js';

export function error(e) {
    return `**Something went wrong. [Submit an issue at the AleeBot repository.](<https://github.com/Alee14/AleeBot/issues>)**\nMessage:\n\`\`\`js\n${e.stack}\`\`\``;
}

export async function blacklistCheck(interaction) {
    const blacklistedUser = await blacklistUser.findOne({ where: { userID: interaction.user.id } });
    const blacklistedGuild = await blacklistGuild.findOne({ where: { guildID: interaction.guild.id } });

    if (blacklistedUser || blacklistedGuild) {
        await interaction.reply({ content: blacklistedUser ? 'You are banned from using this command.' : 'This server is banned from using this command.', flags: MessageFlags.Ephemeral });
        return true;
    }

    return false;
}
