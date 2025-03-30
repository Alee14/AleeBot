import { Router } from 'express';
import { pendingQuote, quote as newQuote } from '../../db/models/quote.js';
import { verifyToken } from './auth.js';

export function quoteRouter(client) {
    const router = Router();

    router.get('/quotes/pending', verifyToken, async (req, res) => {
        try {
            const quotes = await pendingQuote.findAll();
            res.json(quotes);
        } catch (error) {
            console.error('Error fetching quotes:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    router.post('/quotes/add', verifyToken, async (req, res) => {
        const { author, authorImage, quote, year, submitterID } = req.body;
        try {
            await newQuote.create({
                author: author,
                authorImage: authorImage,
                quote: quote,
                year: year,
                submitter: submitterID
            });
            res.status(200).send({ message: 'Added a new quote' });
        } catch (error) {
            console.error('Something went wrong:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    router.post('/quotes/approve', verifyToken, async (req, res) => {
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
                res.status(200).send({ message: 'Quote approved' });
            } else {
                res.status(404).send({ message: 'Quote not found ' });
            }
        } catch (error) {
            console.error('Error approving quote:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    router.post('/quotes/reject', verifyToken, async (req, res) => {
        const { id } = req.body;
        try {
            const quote = await pendingQuote.findByPk(id);
            if (quote) {
                await pendingQuote.destroy({ where: { id } });

                if (!req.body.silent) {
                    client.users.fetch(quote.submitterID).then((user) => {
                        if (req.body.reason) {
                            user.send(`Hello ${user.displayName},\nYour quote was rejected for the following reason:\n\`\`\`\n${req.body.reason}\n\`\`\``);
                        } else {
                            user.send(`Hello ${user.displayName},\nYour quote was rejected.`);
                        }
                    }).catch((err) => {
                        console.error('Error sending rejection message:', err);
                    });
                }

                res.status(200).send({ message: 'Quote rejected', reason: req.body.reason });
            } else {
                res.status(404).send({ message: 'Quote not found' });
            }
        } catch (error) {
            console.error('Error rejecting quote:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    return router;
}
