
export default async function Guilds({session}) {

    const response = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
    });
    const guilds = await response.json();

    const MANAGE_GUILD = 0x00000020;

    const filteredGuilds = guilds.filter((guild) => {
        // Convert permissions string to a BigInt for bitwise operations
        const permissions = BigInt(guild.permissions);
        // Check if MANAGE_GUILD bit is set
        return (permissions & BigInt(MANAGE_GUILD)) === BigInt(MANAGE_GUILD);
    });

    return filteredGuilds.map((guild) => (
        <div key={guild.id}>
            <h2>{guild.name}</h2>
        </div>
    ))
}
