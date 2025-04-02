import { Router } from 'express';

export function authRouter() {
    const router = Router();

    router.post('/blacklist/guild/add', async (req, res) => {
        const { guildID } = req.body;
        try {
            res.status(200).send({ message: 'Added to the blacklist' });
        } catch (error) {
            console.error('Something went wrong:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    router.post('/blacklist/user/add', async (req, res) => {
        const { userID } = req.body;
        try {
            res.status(200).send({ message: 'Added to the blacklist' });
        } catch (error) {
            console.error('Something went wrong:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    router.post('/blacklist/guild/remove', async (req, res) => {
        const { guildID } = req.body;
        try {
            res.status(200).send({ message: 'Removed from the blacklist' });
        } catch (error) {
            console.error('Something went wrong:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    router.post('/blacklist/user/remove', async (req, res) => {
        const { userID } = req.body;
        try {
            res.status(200).send({ message: 'Removed from the blacklist' });
        } catch (error) {
            console.error('Something went wrong:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    return router;
}
