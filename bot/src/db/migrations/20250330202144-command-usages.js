'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('command-usages', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        command: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userID: {
            type: Sequelize.STRING,
            allowNull: false
        },
        guildID: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE
        }
    });
};

export const down = async (queryInterface) => {
    return await queryInterface.dropTable('command-usages');
};
