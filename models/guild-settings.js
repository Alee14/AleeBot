const Sequelize = require("sequelize");
const sequelize = require('../utils/sequelize');

const guildSettings = sequelize.define('guild-settings', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guildID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    logChannelID: {
        type: Sequelize.STRING,
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

})

module.exports = { guildSettings }
