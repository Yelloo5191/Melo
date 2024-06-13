"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import { theme } from "../styles/theme";
import React from "react";

export default function Providers({
  children,
  session,
}: {
  children: any;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SessionProvider>
  );
}
