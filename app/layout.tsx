import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Head from "next/head";

import "@/app/globals.css";

import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Melo",
  description: "A music discovery platform.",
};

export default async function RootLayout({ children }: any) {
  const session = await auth();

  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.auth0.com/js/auth0-samples-theme/1.0/css/auth0-theme.min.css"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.auth0.com/js/auth0-samples-theme/1.0/css/auth0-theme.min.css"
        />
      </Head>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
