import { INTEGER, STRING } from 'sequelize';
import { sequelize } from '../utils/sequelize.js';

export const commandUsages = sequelize.define('command-usages', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    command: {
        type: STRING,
        allowNull: false
    },
    userID: {
        type: STRING,
        allowNull: false
    },
    guildID: {
        type: STRING,
        allowNull: true
    }

}, {
    updatedAt: false,
});

