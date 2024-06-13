"use client";

import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import NextLink from "next/link";

import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import Highlight from "./Highlight";
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
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import SongCard from "./SongCard";

function Dashboard({ topTracks, recoms }) {
  const { user, isAuthenticated, isLoading } = useUser();
  console.log(recoms);
  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <Col md={2}>
            <img
              src={user.picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              decode="async"
              data-testid="profile-picture"
            />
          </Col>
          <Col md>
            <Heading data-testid="profile-name">{user.name}</Heading>
            <p className="lead text-muted" data-testid="profile-email">
              {user.email}
            </p>
          </Col>
          <TableContainer my={"5rem"}>
            <Table variant="simple">
              <Thead>
                <Heading fontSize={27}>Recommended Tracks</Heading>
                <Tr>
                  <Th>Track</Th>
                  <Th>Artist</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recoms.map((song, i) => (
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
          <Tabs>
            <Heading fontSize={27}>Your Recent Top Tracks</Heading>
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
                    <Box display="flex" flexWrap="wrap" width="100%">
                      {topTracks.slice(i * 8, i * 8 + 8).map((song, i) => (
                        <SongCard
                          title={song.name}
                          artist={song.artists[0].name}
                          cover={song.album.images[0].url}
                        />
                      ))}
                    </Box>
                  </TabPanel>
                ),
              )}
            </TabPanels>
          </Tabs>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Dashboard, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
