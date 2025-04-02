'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
// Assuming we have a table in SQLite created as follows:
    await queryInterface.createTable('guild-settings', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        guildID: {
            type: Sequelize.STRING,
            allowNull: false
        },
        memberLogChannelID: {
            type: Sequelize.STRING,
            allowNull: true
        },
        messageLogChannelID: {
            type: Sequelize.STRING,
            allowNull: true
        },
        suggestionsChannelID: {
            type: Sequelize.STRING,
            allowNull: true
        },
        qotdChannelID: {
            type: Sequelize.STRING,
            allowNull: true
        },
        qotdToggle: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        ollamaEnabled: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
    });
};

export const down = async (queryInterface) => {

};
