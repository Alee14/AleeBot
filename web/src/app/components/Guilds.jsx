
export default async function Guilds({session}) {

    const response = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
    });
    const guilds = await response.json();

    const ADMINISTRATOR = 0x0000000000000008;
    const MANAGE_GUILD = 0x00000020;

    const filteredGuilds = guilds.filter((guild) => {
        // Convert permissions string to a BigInt for bitwise operations
        const permissions = BigInt(guild.permissions);
        // Check if user is owner, has ADMINISTRATOR or MANAGE_GUILD permissions
        return guild.owner ||
            (permissions & BigInt(ADMINISTRATOR)) === BigInt(ADMINISTRATOR) ||
            (permissions & BigInt(MANAGE_GUILD)) === BigInt(MANAGE_GUILD);    });

    return filteredGuilds.map((guild) => (
        <div key={guild.id} className="p-1">{guild.name}</div>
    ))
}
