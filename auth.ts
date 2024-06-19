import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: any = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization:
                "https://accounts.spotify.com/authorize?scope=user-read-email+user-top-read+user-read-recently-played+playlist-modify-public+playlist-modify-private",
        } as {
            clientId: string;
            clientSecret: string;
            authorization: string;
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        // @ts-ignore
        async jwt({ token, account, profile, session }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.id = profile?.id;
                token.expires = account.expires_at;
            }
            return token;
        },
        // @ts-ignore
        async session({ session, token }): Promise<any> {
            session.accessToken = token.accessToken as string;
            session.refreshToken = token.refreshToken as string;
            session.id = token.id as string;
            session.expires = token.expires;

            const now = new Date().getTime() / 1000;
            const difference = session.expires - now;
            if (difference <= 600) {
                // 10 minutes in seconds
                console.log("Refreshing token");
                const res = await getRefreshToken(session.refreshToken);
                if (res) {
                    session.accessToken = res.accessToken;
                    session.refreshToken = res.refreshToken;
                    session.expires = now + 3600;
                } else {
                    console.error("Failed to refresh token");
                }
            }

            return session;
        },
    },
};

const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

async function getRefreshToken(refreshToken: string) {
    console.log("Refreshing token");
    const url = `https://accounts.spotify.com/api/token`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token" as string,
            refresh_token: refreshToken as string,
            client_id: process.env.SPOTIFY_CLIENT_ID as string,
        }),
        cache: "no-cache",
    });

    if (!response.ok) {
        console.error("Failed to refresh token", await response.text());
        return null;
    }

    const data = await response.json();

    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || refreshToken,
    };
}

export { handlers, auth, signIn, signOut };
