import { INTEGER, STRING } from 'sequelize';
import { sequelize } from '../utils/sequelize.js';

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
    }
    // qotdChannelID: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // },
    // qotdToggle: {
    //     type: Sequelize.BOOLEAN,
    //     allowNull: true
    // }

});
