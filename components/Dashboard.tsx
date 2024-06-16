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
} from "@chakra-ui/react";
import Loading from "@/components/Loading";
import SongCard from "./SongCard";

function Dashboard({ topTracks, recoms }: any) {
  const { data: session, status } = useSession();

  const user = session?.user;
  const isLoading = status === "loading";

  return (
    <Box px={{ base: 4, md: 10 }} py={{ base: 6, md: 12 }}>
      {isLoading && <Loading />}
      {user && (
        <Flex direction={{ base: "column", md: "row" }} align="center" mb={6}>
          <Box flexShrink={0} mr={{ base: 0, md: 6 }} mb={{ base: 4, md: 0 }}>
            <Image
              src={user.image as string}
              alt="Profile"
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
              data-testid="profile-picture"
            />
          </Box>
          <Box textAlign={{ base: "center", md: "left" }}>
            <Heading data-testid="profile-name">{user.name}</Heading>
            <Text fontSize="lg" color="gray.600" data-testid="profile-email">
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
                    <Heading as="h3" fontSize="2xl">
                      Recommended Tracks
                    </Heading>
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
                      <NextLink href={song.uri}>{song.name}</NextLink>
                    </Td>
                    <Td>{song.artists[0].name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box>
            <Heading as="h3" fontSize="2xl" mb={4}>
              Your Recent Top Tracks
            </Heading>
            <Tabs variant="enclosed">
              <TabList>
                {Array.from(
                  { length: Math.ceil(topTracks.length / 8) },
                  (_, i) => (
                    <Tab key={i}>{i + 1}</Tab>
                  ),
                )}
              </TabList>
              <TabPanels>
                {Array.from(
                  { length: Math.ceil(topTracks.length / 8) },
                  (_, i) => (
                    <TabPanel key={i}>
                      <Flex flexWrap="wrap" justifyContent="space-between">
                        {topTracks.slice(i * 8, i * 8 + 8).map((song, j) => (
                          <SongCard
                            key={j}
                            title={song.name}
                            artist={song.artists[0].name}
                            cover={song.album.images[0].url}
                          />
                        ))}
                      </Flex>
                    </TabPanel>
                  ),
                )}
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
