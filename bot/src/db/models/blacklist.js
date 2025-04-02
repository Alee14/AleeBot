import { INTEGER, STRING } from 'sequelize';
import { sequelize } from '../../utils/sequelize.js';

export const blacklistUser = sequelize.define('blacklist-users', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userID: {
        type: STRING,
        allowNull: false
    }
}, {
    updatedAt: false,
});

export const blacklistGuild = sequelize.define('blacklist-guilds', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guildID: {
        type: STRING,
        allowNull: false
    }
}, {
    updatedAt: false,
});
