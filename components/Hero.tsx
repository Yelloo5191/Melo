import React from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import Logo from "./Logo";

const Hero = () => (
  <VStack className="hero my-5 text-center" data-testid="hero">
    <Logo testId="hero-logo" />
    <Heading data-testid="hero-title">Find your noise.</Heading>
    <Text mb="2rem !important" className="lead" data-testid="hero-lead">
      Melo is a music discovery platform that helps you find new music based on
      your listening habits.
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
        window.location.href = "/dashboard";
      }}
    >
      Get started
    </Button>
  </VStack>
);

export default Hero;
