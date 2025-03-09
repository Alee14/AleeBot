import { INTEGER, STRING, TEXT } from 'sequelize';
import { sequelize } from '../utils/sequelize.js';

export const quote = sequelize.define('quotes', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: STRING,
        allowNull: false
    },
    authorImage: {
        type: STRING,
        allowNull: false
    },
    quote: {
        type: TEXT,
        allowNull: false
    },
    year: {
        type: STRING,
        allowNull: false
    },
    submitter: {
        type: STRING,
        allowNull: false
    }

});

export const pendingQuote = sequelize.define('pending-quotes', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: STRING,
        allowNull: false
    },
    authorImage: {
        type: STRING,
        allowNull: false
    },
    quote: {
        type: TEXT,
        allowNull: false
    },
    year: {
        type: STRING,
        allowNull: false
    },
    submitterAuthor: {
        type: STRING,
        allowNull: false
    },
    submitterID: {
        type: STRING,
        allowNull: false
    }

});
