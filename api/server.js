const express = require('express');
const cors = require('cors');
const quotesRouter  = require('./routes/quotes');

const app = express();
const PORT = 3000;

const createServer = () => {
    app.use(cors()); // Allow cross-origin requests
    app.use(express.json());

    app.use('/api', quotesRouter);

    app.get('/api/version', (req, res) => {
        const { abVersion } = require('../storage/settings.json');
        res.json(abVersion);

    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

module.exports = createServer;
