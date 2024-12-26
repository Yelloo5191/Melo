"use client";

import React from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import Logo from "./Logo";

import { signIn, useSession } from "next-auth/react";

function Hero() {
  const { data: session } = useSession();
  return (
    <VStack
      className="hero"
      data-testid="hero"
      width={{ base: "90%", md: "50%" }}
      mx="auto"
      mb={{ base: "2rem", md: "5rem" }}
    >
      <Logo testId="hero-logo" />
      <Heading data-testid="hero-title" textAlign="center">
        Find your <mark>noise.</mark>
      </Heading>
      <Text
        mb="2rem !important"
        data-testid="hero-lead"
        fontSize="xl"
        textAlign="center"
        w="50%"
      >
        Melo is a <mark>music discovery</mark> platform that helps you find new
        songs based on your listening habits.
      </Text>
      <Button
        bg="brand.logo.light"
        color="brand.colors.primary.text"
        _hover={{ bg: "brand.logo.background" }}
        boxShadow="0px 0px 100px var(--chakra-colors-brand-logo-light)"
        variant="outline"
        size="lg"
        data-testid="hero-button"
        onClick={() => {
          if (session) window.location.href = "/dashboard";
          else signIn("spotify");
        }}
      >
        Get started
      </Button>
    </VStack>
  );
}

export default Hero;
