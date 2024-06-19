"use client";

import React from "react";
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
    Menu,
    MenuItem,
    MenuButton,
    MenuList,
    forwardRef,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import PageLink from "./PageLink";
import { getProfileImage } from "@/utils/spotify";
import { useRouter } from "next/navigation";

import {
    faUser,
    faPowerOff,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    const { isOpen, onToggle } = useDisclosure();
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSignin = async () => {
        await signIn("spotify");
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
                        <>
                            <PageLink href="/dashboard" testId="navbar-dshb">
                                Dashboard
                            </PageLink>
                            <PageLink
                                href="/generator"
                                testId="navbar-dshb-mobile"
                            >
                                Generator
                            </PageLink>
                        </>
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

                {/* desktop */}
                {session?.user && (
                    <VStack
                        align="end"
                        spacing={0}
                        display={{ base: "none", md: "flex" }}
                    >
                        <Menu>
                            <MenuButton
                                as={ProfileBox}
                                session={session}
                                rightIcon={
                                    <FontAwesomeIcon icon={faChevronDown} />
                                }
                            />
                            <MenuList
                                background="brand.darks.dark"
                                border="none"
                                boxShadow="0px 0px 50px var(--chakra-colors-brand-logo-light)"
                            >
                                <MenuItem
                                    background="brand.darks.dark"
                                    data-testid="navbar-profile-desktop"
                                    onClick={() => router.push("/profile")}
                                >
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        style={{ marginRight: "8px" }}
                                    />
                                    Profile
                                </MenuItem>
                                <MenuItem
                                    background="brand.darks.dark"
                                    onClick={handleSignout}
                                    data-testid="navbar-logout-desktop"
                                >
                                    <FontAwesomeIcon
                                        icon={faPowerOff}
                                        style={{ marginRight: "8px" }}
                                    />
                                    Log out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        {/* <ProfileBox session={session} /> */}
                    </VStack>
                )}
            </Flex>

            {/* mobile */}
            <Collapse in={isOpen} animateOpacity>
                <Box p={4} display={{ md: "none" }}>
                    <VStack
                        spacing={4}
                        as="nav"
                        data-testid="navbar-menu-mobile"
                    >
                        <PageLink href="/" testId="navbar-home-mobile">
                            Home
                        </PageLink>
                        {session?.user && (
                            <>
                                <PageLink
                                    href="/dashboard"
                                    testId="navbar-dshb-mobile"
                                >
                                    Dashboard
                                </PageLink>
                                <PageLink
                                    href="/generator"
                                    testId="navbar-dshb-mobile"
                                >
                                    Generator
                                </PageLink>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    data-testid="navbar-menu-mobile"
                                >
                                    <Image
                                        src={getProfileImage(session)}
                                        alt="Profile"
                                        borderRadius="full"
                                        boxSize="50px"
                                        data-testid="navbar-picture-mobile"
                                    />
                                    <Box ml={3}>
                                        <Heading size="sm">
                                            {session?.user.name}
                                        </Heading>
                                    </Box>
                                </Box>
                                <Button
                                    onClick={() => router.push("/profile")}
                                    leftIcon={<FontAwesomeIcon icon={faUser} />}
                                    variant="link"
                                    data-testid="navbar-profile-mobile"
                                >
                                    Profile
                                </Button>
                                <Button
                                    onClick={handleSignout}
                                    leftIcon={
                                        <FontAwesomeIcon icon={faPowerOff} />
                                    }
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

// @ts-ignore
const ProfileBox = forwardRef<BoxProps, "div">((props, ref) => (
    <Box
        ref={ref}
        display="flex"
        alignItems="center"
        data-testid="navbar-menu-desktop"
        cursor="pointer"
        {...props}
    >
        <Image
            src={getProfileImage(props.session)}
            alt="Profile"
            borderRadius="full"
            boxSize="50px"
            data-testid="navbar-picture-desktop"
        />
        <Box ml={3}>
            <Heading size="sm">{props.session?.user.name}</Heading>
        </Box>
    </Box>
));
