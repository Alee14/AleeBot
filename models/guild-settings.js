const Sequelize = require("sequelize");
const sequelize = require('../utils/sequelize');

const guildSettings = sequelize.define('guild-settings', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    logChannelID: {
        type: Sequelize.STRING,
        allowNull: true
    },
    autoRoleToggle: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    autoRoleID: {
        type: Sequelize.STRING,
        allowNull: true
    }

})

module.exports = guildSettings
