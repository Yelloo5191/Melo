import React from "react";
import {
  VStack,
  Heading,
  Image,
  Text,
  Card,
  CardBody,
  CardHeader,
  Show,
  Hide,
  HStack,
} from "@chakra-ui/react";

const SongCard = ({ title, artist, cover }: any) => (
  <Card
    className="song-card"
    data-testid="song-card"
    width={["600px", "200px"]}
    height={["100px", "300px"]}
    background="brand.darks.medium"
    margin="1rem"
  >
    <Show above="sm">
      <CardHeader className="song-card-header">
        <Image
          src={cover}
          alt="Song Cover"
          className="song-card-cover"
          width="200px"
        />
      </CardHeader>
    </Show>
    <HStack height={["100px", "300px"]} width="100%">
      <Hide display="flex" above="sm" justifySelf="top" align="flex-end">
        <Image
          src={cover}
          alt="Song Cover"
          className="song-card-cover"
          width="100px"
          height="100px"
        />
      </Hide>

      <CardBody className="song-card-body">
        <Heading size="md" className="song-card-title">
          {title}
        </Heading>
        <Text color="brand.darks.light" className="song-card-artist">
          {artist}
        </Text>
      </CardBody>
    </HStack>
  </Card>
);

export default SongCard;
