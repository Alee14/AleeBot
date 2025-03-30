import { Events } from 'discord.js';

export default {
    name: Events.ThreadListSync,
    async execute(threads) {
        await threads.forEach(thread => {
            if (!thread.members.cache.has(threads.client.user.id)) {
                thread.join()
                    .catch(error => console.error(`[X] Failed to join thread ${thread.name}:`, error));
            }
        });
    }
};
