"use client";

import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import { Box } from "@chakra-ui/react";

import { Container } from "reactstrap";

export default function Layout({ children }: any) {
  return (
    <Box
      id="app"
      display="flex"
      flexDir={"column"}
      height={"100vh"}
      data-testid="layout"
    >
      <Header />
      <Container style={{ flexGrow: 1, marginTop: 5 }}>{children}</Container>
      <Footer />
    </Box>
  );
}
