"use client";

import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import { Box, Alert, AlertIcon } from "@chakra-ui/react";

import { Container } from "reactstrap";

// fix fontawesome bug
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

export default function Layout({ children }: any) {
    return (
        <Box
            id="app"
            display="flex"
            flexDir={"column"}
            height={"100vh"}
            data-testid="layout"
        >
            <Alert status="warning" color="black">
                <AlertIcon />
                Melo is currently undergoing an Extension Request with Spotify,
                new users will not be able to sign in until the request is
                approved.
            </Alert>
            <Header />
            <Container style={{ flexGrow: 1, marginTop: 5 }}>
                {children}
            </Container>
            <Footer />
        </Box>
    );
}
