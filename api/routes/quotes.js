const express = require('express');
const quoteDB = require('../../models/quote.js');

const router = express.Router();

const pendingQuote = quoteDB.pendingQuote;
const approvedQuote = quoteDB.quote;

router.get('/pending-quotes', async (req, res) => {
    try {
        const quotes = await pendingQuote.findAll();
        res.json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/approve-quote', async (req, res) => {
    const { id } = req.body;
    try {
        const quote = await pendingQuote.findByPk(id);
        if (quote) {
            await approvedQuote.create({
                author: quote.author,
                authorImage: quote.authorImage,
                quote: quote.quote,
                year: quote.year,
                submitter: quote.submitterID
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

router.post('/reject-quote', async (req, res) => {
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

module.exports = router;
