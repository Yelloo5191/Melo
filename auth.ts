import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: any = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email+user-top-read+user-read-recently-played",
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
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.id = profile?.id;
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }): Promise<any> {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user.id = token.id as string;

      const now = Math.floor(Date.now() / 1000);
      const expires = Math.floor(new Date(session.expires).getTime() / 1000);
      const difference = expires - now;

      if (difference <= 600) {
        // 10 minutes in seconds
        console.log("Refreshing token");
        const res = await getRefreshToken(token.refreshToken);
        if (res) {
          session.accessToken = res.accessToken;
          session.refreshToken = res.refreshToken;
          token.accessToken = res.accessToken;
          token.refreshToken = res.refreshToken;
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
  const url = `https://accounts.spotify.com/api/token`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token" as string,
      refresh_token: refreshToken as string,
      client_id: process.env.SPOTIFY_CLIENT_ID as string,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET as string,
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
    refreshToken: data.refresh_token || refreshToken, // Spotify may not always return a new refresh token
  };
}

export { handlers, auth, signIn, signOut };
