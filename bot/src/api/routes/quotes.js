import { Router } from 'express';
import { pendingQuote, quote as newQuote } from '../../models/quote.js';
import { verifyToken } from './auth.js';

export const quoteRouter = Router();

quoteRouter.get('/quotes/pending', verifyToken, async (req, res) => {
    try {
        const quotes = await pendingQuote.findAll();
        res.json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).send('Internal Server Error');
    }
});

quoteRouter.post('/quotes/add', verifyToken, async (req, res) => {
    const { author, authorImage, quote, year, submitterID } = req.body;
    try {
        await newQuote.create({
            author: author,
            authorImage: authorImage,
            quote: quote,
            year: year,
            submitter: submitterID
        });
        res.status(200).send('Added a new quote');
    } catch (error) {
        console.error('Something went wrong:', error);
        res.status(500).send('Internal Server Error');
    }
});

quoteRouter.post('/quotes/approve', verifyToken, async (req, res) => {
    const { id } = req.body;
    try {
        const quote = await pendingQuote.findByPk(id);
        if (quote) {
            await newQuote.create({
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

quoteRouter.post('/quotes/reject', verifyToken, async (req, res) => {
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
