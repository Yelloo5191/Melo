import React from "react";

import { Box } from "@chakra-ui/react";

export default function Container({ children, ...props }: any) {
    return (
        <Box
            maxW="container.xl"
            mx="auto"
            px={{ base: "6", md: "8" }}
            {...props}
        >
            {children}
        </Box>
    );
}
