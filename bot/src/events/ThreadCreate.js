import { Events } from 'discord.js';

export default {
    name: Events.ThreadCreate,
    async execute(thread) {
        await thread.join(thread.id);
    }
};
