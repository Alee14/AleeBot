import { INTEGER, STRING, BOOLEAN } from 'sequelize';
import { sequelize } from '../../utils/sequelize.js';

// potentially rename the table to settings-guilds to stay consistent
export const guildSettings = sequelize.define('guild-settings', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guildID: {
        type: STRING,
        allowNull: false
    },
    memberLogChannelID: {
        type: STRING,
        allowNull: true
    },
    messageLogChannelID: {
        type: STRING,
        allowNull: true
    },
    warnLogChannelID: {
        type: STRING,
        allowNull: true
    },
    suggestionsChannelID: {
        type: STRING,
        allowNull: true
    },
    qotdChannelID: {
        type: STRING,
        allowNull: true
    },
    qotdToggle: {
        type: BOOLEAN,
        allowNull: true
    },
    ollamaEnabled: {
        type: BOOLEAN,
        allowNull: true
    },

});
