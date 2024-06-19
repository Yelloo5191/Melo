import { auth, signIn } from "@/auth";

import { Box, Heading } from "@chakra-ui/react";
import Container from "@/components/Container";
import Generator from "@/components/Generator";

export default async function Page() {
    const session = await auth();

    if (session) {
        return (
            <Container px={{ base: 4, md: 0 }} py={20} height="100%">
                <Heading textAlign="center">
                    Enhance your <mark>mood</mark>
                </Heading>
                <Heading size="2xl" textAlign="center">
                    discover your <mark>tastes</mark>
                </Heading>

                <Box my={10} height="50%">
                    <Generator />
                </Box>
            </Container>
        );
    } else {
        return signIn();
    }
}
