"use client";

import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  VStack,
  Button,
  Collapse,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import PageLink from "./PageLink";
import AnchorLink from "./AnchorLink";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: session, status } = useSession();

  const handleSignin = async () => {
    await signIn("scope=user-read-private user-read-email user-top-read");
  };

  const handleSignout = async () => {
    await signOut();
  };

  return (
    <Box
      data-testid="navbar"
      width="100%"
      bg="brand.darks.medium"
      boxShadow="0px 0px 100px var(--chakra-colors-brand-logo-light)"
    >
      <Flex
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        p={4}
      >
        <Box className="logo" />

        <Box
          display={{ base: "block", md: "none" }}
          onClick={onToggle}
          data-testid="navbar-toggle"
        >
          <Button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Box>

        <HStack
          display={{ base: "none", md: "flex" }}
          spacing={4}
          as="nav"
          data-testid="navbar-items"
        >
          <PageLink href="/" testId="navbar-home">
            Home
          </PageLink>
          {session?.user && (
            <PageLink href="/dashboard" testId="navbar-dshb">
              Dashboard
            </PageLink>
          )}
        </HStack>

        {status !== "loading" && !session?.user && (
          <Button
            bg="brand.logo.background"
            _hover={{ bg: "brand.logo.light" }}
            color="brand.colors.primary.text"
            boxShadow="0px 0px 100px var(--chakra-colors-brand-logo-light)"
            variant="outline"
            size="lg"
            data-testid="hero-button"
            onClick={handleSignin}
            display={{ base: "none", md: "inline-flex" }}
          >
            Log in
          </Button>
        )}

        {session?.user && (
          <VStack
            align="end"
            spacing={0}
            display={{ base: "none", md: "flex" }}
          >
            <Box
              display="flex"
              alignItems="center"
              data-testid="navbar-menu-desktop"
            >
              <Image
                src={session?.user.image as string}
                alt="Profile"
                borderRadius="full"
                boxSize="50px"
                data-testid="navbar-picture-desktop"
              />
              <Box ml={3}>
                <Heading size="sm">{session?.user.name}</Heading>
              </Box>
            </Box>
            <PageLink href="/profile" testId="navbar-profile-mobile">
              <Button
                leftIcon={<FontAwesomeIcon icon={faUser} />}
                variant="link"
                data-testid="navbar-profile-mobile"
              >
                Profile
              </Button>
            </PageLink>
            <Button
              onClick={handleSignout}
              leftIcon={<FontAwesomeIcon icon={faPowerOff} />}
              variant="link"
              data-testid="navbar-logout-desktop"
            >
              Log out
            </Button>
          </VStack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box p={4} display={{ md: "none" }}>
          <VStack spacing={4} as="nav" data-testid="navbar-menu-mobile">
            <PageLink href="/" testId="navbar-home-mobile">
              Home
            </PageLink>
            {session?.user && (
              <>
                <PageLink href="/dashboard" testId="navbar-dshb-mobile">
                  Dashboard
                </PageLink>
                <Box
                  display="flex"
                  alignItems="center"
                  data-testid="navbar-menu-mobile"
                >
                  <Image
                    src={session?.user.image as string}
                    alt="Profile"
                    borderRadius="full"
                    boxSize="50px"
                    data-testid="navbar-picture-mobile"
                  />
                  <Box ml={3}>
                    <Heading size="sm">{session?.user.name}</Heading>
                  </Box>
                </Box>
                <Button
                  onClick={handleSignout}
                  leftIcon={<FontAwesomeIcon icon={faPowerOff} />}
                  variant="link"
                  data-testid="navbar-logout-mobile"
                >
                  Log out
                </Button>
              </>
            )}
            {status !== "loading" && !session?.user && (
              <Button
                bg="brand.logo.background"
                _hover={{ bg: "brand.logo.light" }}
                color="brand.colors.primary.text"
                boxShadow="0px 0px 100px var(--chakra-colors-brand-logo-light)"
                variant="outline"
                size="lg"
                data-testid="hero-button-mobile"
                onClick={handleSignin}
              >
                Log in
              </Button>
            )}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}
