import React from 'react';
import { chakra, Box, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ChakraFooter = chakra('footer');
const Footer = () => (
  <ChakraFooter
    bgColor="brand.darks.medium"
    padding={3}
    textAlign="center"
    data-testid="footer"
    boxShadow={'md'}
    display="flex"
    justifyContent="center"
    alignItems="center">
    <Box margin={0} className="logo" data-testid="footer-logo" />
    <Text margin={0} data-testid="footer-text">
      Developed with
      <FontAwesomeIcon icon={faHeart} className="mx-1 fa-beat" color="var(--chakra-colors-brand-primary-highlight)" />
      by <Link href="https://github.com/Yelloo5191">Hovhannes Muradyan</Link>
    </Text>
  </ChakraFooter>
);

export default Footer;
