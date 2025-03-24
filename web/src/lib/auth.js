import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Discord({
        authorization: {
            url: "https://discord.com/api/oauth2/authorize",
            params: { scope: "identify guilds" },
        }
    })],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after sign in
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.accessToken) {
                session.user = await fetch('https://discord.com/api/users/@me', {
                    headers: {
                        authorization: `Bearer ${token.accessToken}`
                    }
                }).then((r) => r.json());
                session.accessToken = token.accessToken;
            }

            return session;
        }
    }
})
