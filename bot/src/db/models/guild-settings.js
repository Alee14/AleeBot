import { INTEGER, STRING, BOOLEAN } from 'sequelize';
import { sequelize } from '../../utils/sequelize.js';

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
    logChannelID: {
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
