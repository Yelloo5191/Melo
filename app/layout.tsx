import type { Metadata } from "next";
import Providers from "./providers";

import "@/app/globals.css";

import { auth } from "@/auth";

import { fonts } from "./fonts";

import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Melo",
  description: "A music discovery platform.",
};

export default async function RootLayout({ children }: any) {
  const session = await auth();

  return (
    <html lang="en" className={fonts.poly.className}>
      <body>
        <Providers session={session}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
