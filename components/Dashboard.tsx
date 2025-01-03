"use client";

import React from "react";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import {
    Box,
    Heading,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Image,
    Text,
    Flex,
    Code,
    HStack,
} from "@chakra-ui/react";
import Loading from "@/components/Loading";
import SongCard from "./SongCard";
import Container from "./Container";
import { getProfileImage } from "@/utils/spotify";

function Dashboard({ topTracks, recoms, recentTracks }: any) {
    const { data: session, status } = useSession();

    const user = session?.user;
    const isLoading = status === "loading";

    return (
        <Container px={{ base: 4, md: 0 }} py={20} height="100%">
            {isLoading && <Loading />}
            {user && (
                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="center"
                    mb={6}
                >
                    <Box
                        flexShrink={0}
                        mr={{ base: 0, md: 6 }}
                        mb={{ base: 4, md: 0 }}
                    >
                        <Image
                            src={getProfileImage(session)}
                            alt="Profile"
                            borderRadius="full"
                            boxSize="150px"
                            objectFit="cover"
                            data-testid="profile-picture"
                        />
                    </Box>
                    <Box textAlign={{ base: "center", md: "left" }}>
                        <Heading data-testid="profile-name">
                            {user.name}
                        </Heading>
                        <Text
                            fontSize="lg"
                            color="gray.600"
                            data-testid="profile-email"
                        >
                            {user.email}
                        </Text>
                    </Box>
                </Flex>
            )}
            {user && (
                <Box>
                    <TableContainer my="5rem">
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th colSpan={2}>
                                        <HStack>
                                            <Image
                                                src="Spotify_Icon_RGB_Green.png"
                                                boxSize="50px"
                                                alt="Spotify Logo"
                                            />
                                            <Heading as="h3" fontSize="xl">
                                                Recommended Tracks
                                            </Heading>
                                        </HStack>
                                    </Th>
                                </Tr>
                                <Tr>
                                    <Th>Track</Th>
                                    <Th>Artist</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {recoms.map((song: any, i: number) => (
                                    <Tr key={i}>
                                        <Td>
                                            <NextLink href={song.uri}>
                                                {song.name}
                                            </NextLink>
                                        </Td>
                                        <Td>{song.artists[0].name}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {/* Desktop */}
                    <Flex
                        display={{ base: "none", md: "flex" }}
                        flexWrap="wrap"
                    >
                        <Box>
                            <HStack mb={4}>
                                <Image
                                    src="Spotify_Icon_RGB_Green.png"
                                    boxSize="50px"
                                    alt="Spotify Logo"
                                />
                                <Heading as="h3" fontSize="2xl">
                                    Your Recent Top Tracks
                                </Heading>
                            </HStack>
                            <Tabs variant="soft-rounded" colorScheme="blue">
                                <TabList>
                                    {Array.from(
                                        {
                                            length: Math.ceil(
                                                topTracks.length / 8
                                            ),
                                        },
                                        (_, i) => (
                                            <Tab key={i}>{i + 1}</Tab>
                                        )
                                    )}
                                </TabList>
                                <TabPanels>
                                    {Array.from(
                                        {
                                            length: Math.ceil(
                                                topTracks.length / 8
                                            ),
                                        },
                                        (_, i) => (
                                            <TabPanel key={i}>
                                                <Box
                                                    display="grid"
                                                    gridTemplateColumns="repeat(4, 1fr)"
                                                    gap={2}
                                                >
                                                    {topTracks
                                                        .slice(i * 8, i * 8 + 8)
                                                        .map(
                                                            (
                                                                song: any,
                                                                j: number
                                                            ) => (
                                                                <Box key={j}>
                                                                    <SongCard
                                                                        title={
                                                                            song.name
                                                                        }
                                                                        artist={
                                                                            song
                                                                                .artists[0]
                                                                                .name
                                                                        }
                                                                        cover={
                                                                            song
                                                                                .album
                                                                                .images[0]
                                                                                .url
                                                                        }
                                                                    />
                                                                </Box>
                                                            )
                                                        )}
                                                </Box>
                                            </TabPanel>
                                        )
                                    )}
                                </TabPanels>
                            </Tabs>
                        </Box>
                        <Box>
                            <HStack mb={4}>
                                <Image
                                    src="Spotify_Icon_RGB_Green.png"
                                    boxSize="50px"
                                    alt="Spotify Logo"
                                />
                                <Heading as="h3" fontSize="2xl">
                                    Your Recently Played
                                </Heading>
                            </HStack>
                            <Box>
                                {recentTracks.map((song: any, i: number) => (
                                    <Flex
                                        key={i}
                                        mb={4}
                                        align="center"
                                        p={4}
                                        borderRadius="md"
                                        boxShadow="md"
                                        background="brand.darks.medium"
                                    >
                                        <Image
                                            src={song.track.album.images[0].url}
                                            alt={song.track.name}
                                            boxSize="50px"
                                            borderRadius="md"
                                            mr={4}
                                        />
                                        <Box>
                                            <Text
                                                fontWeight="bold"
                                                fontSize="lg"
                                            >
                                                {song.track.name}
                                            </Text>
                                            <Text color="gray.600">
                                                {song.track.artists[0].name}
                                            </Text>
                                            <Text
                                                color="gray.500"
                                                fontSize="sm"
                                            >
                                                {Math.ceil(
                                                    (new Date().getTime() -
                                                        new Date(
                                                            song.played_at
                                                        ).getTime()) /
                                                        1000 /
                                                        60
                                                )}{" "}
                                                minutes ago
                                            </Text>
                                        </Box>
                                    </Flex>
                                ))}
                            </Box>
                        </Box>
                    </Flex>

                    {/* Mobile */}
                    <Box display={{ base: "block", md: "none" }}>
                        <HStack mb={4}>
                            <Image
                                src="Spotify_Icon_RGB_Green.png"
                                boxSize="50px"
                                alt="Spotify Logo"
                            />
                            <Heading as="h3" fontSize="2xl">
                                Your Recent Top Tracks
                            </Heading>
                        </HStack>
                        <Tabs variant="soft-rounded" colorScheme="blue">
                            <TabList>
                                {Array.from(
                                    { length: Math.ceil(topTracks.length / 4) },
                                    (_, i) => (
                                        <Tab key={i}>{i + 1}</Tab>
                                    )
                                )}
                            </TabList>
                            <TabPanels>
                                {Array.from(
                                    { length: Math.ceil(topTracks.length / 4) },
                                    (_, i) => (
                                        <TabPanel key={i}>
                                            <Box
                                                gridTemplateColumns="repeat(2, 1fr)"
                                                gap={4}
                                            >
                                                {topTracks
                                                    .slice(i * 4, i * 4 + 4)
                                                    .map(
                                                        (
                                                            song: any,
                                                            j: number
                                                        ) => (
                                                            <Box
                                                                key={j}
                                                                width="100%"
                                                            >
                                                                <SongCard
                                                                    title={
                                                                        song.name
                                                                    }
                                                                    artist={
                                                                        song
                                                                            .artists[0]
                                                                            .name
                                                                    }
                                                                    cover={
                                                                        song
                                                                            .album
                                                                            .images[0]
                                                                            .url
                                                                    }
                                                                    width="100%"
                                                                    mx="auto"
                                                                    my={1}
                                                                />
                                                            </Box>
                                                        )
                                                    )}
                                            </Box>
                                        </TabPanel>
                                    )
                                )}
                            </TabPanels>
                        </Tabs>
                    </Box>
                    <Box display={{ base: "block", md: "none" }}>
                        <HStack mb={4}>
                            <Image
                                src="Spotify_Icon_RGB_Green.png"
                                boxSize="50px"
                                alt="Spotify Logo"
                            />
                            <Heading as="h3" fontSize="2xl">
                                Your Recently Played
                            </Heading>
                        </HStack>
                        <Box>
                            {recentTracks.map((song: any, i: number) => (
                                <Flex
                                    key={i}
                                    mb={4}
                                    align="center"
                                    p={4}
                                    borderRadius="md"
                                    boxShadow="md"
                                >
                                    <Image
                                        src={song.track.album.images[0].url}
                                        alt={song.track.name}
                                        boxSize="50px"
                                        borderRadius="md"
                                        mr={4}
                                    />
                                    <Box>
                                        <Text fontWeight="bold" fontSize="lg">
                                            {song.track.name}
                                        </Text>
                                        <Text color="gray.600">
                                            {song.track.artists[0].name}
                                        </Text>
                                        <Text color="gray.500" fontSize="sm">
                                            {Math.ceil(
                                                (new Date().getTime() -
                                                    new Date(
                                                        song.played_at
                                                    ).getTime()) /
                                                    1000 /
                                                    60
                                            )}{" "}
                                            minutes ago
                                        </Text>
                                    </Box>
                                </Flex>
                            ))}
                        </Box>
                    </Box>
                </Box>
            )}
        </Container>
    );
}

export default Dashboard;
