'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('guild-settings', 'suggestionsChannelID', {
        type: Sequelize.STRING,
        allowNull: true
    });

    await queryInterface.addColumn('guild-settings', 'qotdChannelID', {
        type: Sequelize.STRING,
        allowNull: true
    });

    await queryInterface.addColumn('guild-settings', 'qotdToggle', {
        type: Sequelize.BOOLEAN,
        allowNull: true
    });

    await queryInterface.addColumn('guild-settings', 'ollamaEnabled', {
        type: Sequelize.BOOLEAN,
        allowNull: true
    });
};

export const down = async (queryInterface) => {
    await queryInterface.removeColumn('guild-settings', 'suggestionsChannelID');
    await queryInterface.removeColumn('guild-settings', 'qotdChannelID');
    await queryInterface.removeColumn('guild-settings', 'qotdToggle');
    await queryInterface.removeColumn('guild-settings', 'ollamaEnabled');
};
