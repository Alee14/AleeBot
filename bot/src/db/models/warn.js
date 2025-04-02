import { INTEGER, STRING } from 'sequelize';
import { sequelize } from '../../utils/sequelize.js';

export const warnSettings = sequelize.define('warn-settings', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guildID: {
        type: STRING,
        allowNull: false
    },
    strikes: {
        type: STRING,
        allowNull: false
    },
    punishment: {
        type: STRING,
        allowNull: false
    }
});

export const warnLog = sequelize.define('warn-log', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guildID: {
        type: STRING,
        allowNull: false
    },
    userID: {
        type: STRING,
        allowNull: false
    },
    reason: {
        type: STRING,
        allowNull: false
    }
});
