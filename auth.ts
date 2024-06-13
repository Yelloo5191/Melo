import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "user-read-private user-read-email",
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        },
      },
    } as {
      clientId: string;
      clientSecret: string;
      authorization: {
        params: {
          scope: string;
        };
      };
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.id = profile?.id;
      }
      return token;
    },
    async session({ session, token }): Promise<any> {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user.id = token.id as string;

      const now = Math.floor(Date.now() / 1000);
      const difference = Math.floor((session.expires - now) / 60);

      if (difference <= 10) {
        const res = await getRefreshToken();
        if (!res) {
          return;
        }
        session.accessToken = res.accessToken;
        session.refreshToken = res.refreshToken;
      }

      return session;
    },
  },
});

async function getRefreshToken() {
  const session = await auth();
  if (session) {
    const refreshToken = session.refreshToken;
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
    const data = await response.json();

    return {
      accessToken: data.access_token as string,
      refreshToken: data.refresh_token as string,
    };
  }
}

export { handlers, auth, signIn, signOut };
