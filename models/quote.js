const Sequelize = require("sequelize");
const sequelize = require('../utils/sequelize');

const quote = sequelize.define('quotes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorImage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quote: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    submitter: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

const pendingQuote = sequelize.define('pending-quotes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorImage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quote: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    submitterAuthor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    submitterID: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = { quote, pendingQuote };
