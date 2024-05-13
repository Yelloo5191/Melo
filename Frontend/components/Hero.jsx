import React from 'react';
import { VStack, Heading, Text } from '@chakra-ui/react';
import Logo from './Logo';

const Hero = () => (
  <VStack className="hero my-5 text-center" data-testid="hero">
    <Logo testId="hero-logo" />
    <Heading data-testid="hero-title">Find your noise.</Heading>
    <Text className="lead" data-testid="hero-lead">
      Melo is a music discovery platform that helps you find new music based on your listening habits.
    </Text>
  </VStack>
);

export default Hero;
