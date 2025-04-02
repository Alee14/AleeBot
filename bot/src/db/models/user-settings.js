import { INTEGER, STRING } from 'sequelize';
import { sequelize } from '../../utils/sequelize.js';

export const userSettings = sequelize.define('user-settings', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userID: {
        type: STRING,
        allowNull: false
    },
    language: {
        type: STRING,
        allowNull: true
    }
});
