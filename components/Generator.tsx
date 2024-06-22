"use client";

import React from "react";
import {
    VStack,
    Heading,
    Text,
    Button,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    HStack,
    Flex,
    Spacer,
    Center,
    AspectRatio,
    Image,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createCustomPlaylist } from "@/utils/spotify";

import { signIn, useSession } from "next-auth/react";
import Loading from "./Loading";

function Generator() {
    const { data: session } = useSession();
    const [navState, setNavState] = React.useState("mood");
    const [mood, setMood] = React.useState("None");
    const [isLoadingResult, setIsLoadingResult] = React.useState(true);
    const [playlistLink, setPlaylistLink] = React.useState("");
    const [playlistURI, setPlaylistURI] = React.useState("");
    const router = useRouter();

    const moods = {
        Happy: {
            name: "Happy",
            energy: [0.6, 1.0],
            tempo: [100, 140],
            key: [0, 2, 4, 5, 7, 9, 11],
            icon: "😄",
            color: "#98cf8b",
        },
        Sad: {
            name: "Sad",
            energy: [0.0, 0.4],
            tempo: [60, 90],
            key: [1, 3, 6, 8, 10],
            icon: "😢",
            color: "#aeb1d7",
        },
        Energetic: {
            name: "Energetic",
            energy: [0.7, 1.0],
            tempo: [120, 160],
            key: [0, 2, 4, 5, 7, 9, 11],
            icon: "🤩",
            color: "#f7b267",
        },
        Calm: {
            name: "Calm",
            energy: [0.0, 0.3],
            tempo: [60, 80],
            key: [0, 2, 3, 5, 7, 9, 10],
            icon: "😌",
            color: "#fffbbb",
        },
        Romantic: {
            name: "Romantic",
            energy: [0.2, 0.5],
            tempo: [70, 110],
            key: [0, 2, 5, 7],
            icon: "😍",
            color: "#f9a8d4",
        },
        Melancholic: {
            name: "Melancholic",
            energy: [0.2, 0.5],
            tempo: [60, 80],
            key: [1, 3, 6, 8, 10],
            icon: "😔",
            color: "#b5b2b5",
        },
        Upbeat: {
            name: "Upbeat",
            energy: [0.6, 1.0],
            tempo: [110, 150],
            key: [0, 2, 4, 5, 7, 9, 11],
            icon: "🤪",
            color: "#7076fc",
        },
        None: {
            name: "None",
            energy: [0.0, 1.0],
            tempo: [0, 200],
            key: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            icon: "🎶",
            color: "#f5f5f5",
        },
    };

    return (
        <Box
            background="brand.darks.medium"
            p={4}
            borderRadius="md"
            height="100%"
        >
            <Breadcrumb
                spacing="8px"
                separator={<FontAwesomeIcon icon={faChevronRight} />}
            >
                <BreadcrumbItem
                    onClick={() => setNavState("mood")}
                    cursor="pointer"
                >
                    <Text>
                        {" "}
                        {navState === "mood" ? <mark>Mood</mark> : "Mood"}{" "}
                    </Text>
                </BreadcrumbItem>

                <BreadcrumbItem
                    onClick={() => {
                        if (navState === "result") setNavState("confirm");
                    }}
                    cursor="pointer"
                >
                    <Text>
                        {" "}
                        {navState === "confirm" ? (
                            <mark>Confirm</mark>
                        ) : (
                            "Confirm"
                        )}{" "}
                    </Text>
                </BreadcrumbItem>

                <BreadcrumbItem cursor="pointer">
                    <Text>
                        {" "}
                        {navState === "result" ? (
                            <mark>Result</mark>
                        ) : (
                            "Result"
                        )}{" "}
                    </Text>
                </BreadcrumbItem>
            </Breadcrumb>

            {navState === "mood" && (
                <Box display="flex" flexDir="column">
                    <Heading size="lg" textAlign="center">
                        Select the mood you want for your playlist
                    </Heading>

                    <Flex
                        justifyContent="center"
                        mt={4}
                        px={{ base: 0, md: 40 }}
                        gap={4}
                        wrap="wrap"
                    >
                        {Object.keys(moods).map((mood) => {
                            if (mood === "None") return null;
                            else
                                return (
                                    <>
                                        <Button
                                            key={mood}
                                            onClick={() => {
                                                setMood(mood);
                                                setNavState("confirm");
                                            }}
                                            // @ts-ignore
                                            background={moods[mood].color}
                                        >
                                            {/* @ts-ignore */}
                                            {moods[mood].icon} {mood}
                                        </Button>
                                    </>
                                );
                        })}
                    </Flex>

                    <Heading mt={10} size="lg" textAlign="center">
                        {" "}
                        Or, generate a playlist with no specific mood{" "}
                    </Heading>

                    <Button
                        margin="auto"
                        onClick={() => {
                            setMood("None");
                            setNavState("confirm");
                        }}
                        mt={4}
                    >
                        {moods["None"].icon} {mood}
                    </Button>
                </Box>
            )}

            {navState === "confirm" && (
                <Box display="flex" flexDir="column">
                    <Heading size="lg" textAlign="center">
                        You selected the mood: {mood}
                    </Heading>

                    <Button
                        margin="auto"
                        onClick={async () => {
                            setNavState("result");
                            setIsLoadingResult(true);
                            // @ts-ignore
                            const res = await createCustomPlaylist(
                                session,
                                // @ts-ignore
                                moods[mood]
                            );
                            setPlaylistLink(res.id);
                            setPlaylistURI(res.uri);
                            setTimeout(() => {
                                setIsLoadingResult(false);
                            }, 2000);
                        }}
                        mt={4}
                    >
                        Confirm
                    </Button>
                </Box>
            )}

            {navState === "result" && (
                <Center height="100%">
                    {isLoadingResult ? (
                        <Loading width="100px" height="100px" />
                    ) : (
                        <Box display="flex" flexDir="column">
                            <Button
                                margin="auto"
                                onClick={() => router.push(playlistURI)}
                                background="#191414"
                                color="#1DB954"
                                gap={2}
                                mx="auto"
                            >
                                <Image
                                    src="/Spotify_Icon_RGB_Green.png"
                                    width="20px"
                                    alt="Spotify Logo"
                                />
                                {"  "}
                                Open Spotify
                            </Button>
                            <Heading size="lg" textAlign="center">
                                Your playlist is ready.
                            </Heading>
                            <Text textAlign="center">
                                Access it at{" "}
                                <AspectRatio ratio={16 / 9}>
                                    <iframe
                                        style={{
                                            borderRadius: "12px",
                                        }}
                                        src={`https://open.spotify.com/embed/playlist/${playlistLink}?utm_source=generator`}
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                    ></iframe>
                                </AspectRatio>
                            </Text>
                        </Box>
                    )}
                </Center>
            )}
        </Box>
    );
}

export default Generator;
