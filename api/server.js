const express = require('express');
const cors = require('cors');
const { pendingQuote, quote: approvedQuote } = require('../models/quote.js');

const app = express();
const PORT = 3000;

const createServer = () => {
    app.use(cors()); // Allow cross-origin requests
    app.use(express.json());

    // Endpoint to get all pending quotes
    app.get('/api/pending-quotes', async (req, res) => {
        try {
            const quotes = await pendingQuote.findAll();
            res.json(quotes);
        } catch (error) {
            console.error('Error fetching quotes:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.post('/api/approve-quote', async (req, res) => {
        const { id } = req.body;
        try {
            const quote = await pendingQuote.findByPk(id);
            if (quote) {
                await approvedQuote.create({
                    author: quote.author,
                    quote: quote.quote,
                    year: quote.year,
                    authorImage: quote.authorImage
                });
                await pendingQuote.destroy({ where: { id } });
                res.status(200).send('Quote approved');
            } else {
                res.status(404).send('Quote not found');
            }
        } catch (error) {
            console.error('Error approving quote:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.post('/api/reject-quote', async (req, res) => {
        const { id } = req.body;
        try {
            const quote = await pendingQuote.findByPk(id);
            if (quote) {
                await pendingQuote.destroy({ where: { id } });
                res.status(200).send('Quote rejected');
            } else {
                res.status(404).send('Quote not found');
            }
        } catch (error) {
            console.error('Error rejecting quote:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.get('/api/version', (req, res) => {
        const { abVersion } = require('../storage/settings.json');
        res.json(abVersion);

    });

    app.get('/' , (req, res) => {
        res.send('API for AleeBot');
        // Most likely going to redirect to the frontend
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

module.exports = createServer;
