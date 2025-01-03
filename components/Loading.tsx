import React from "react";

import { Spinner } from "@chakra-ui/react";

export default function Loading({ ...props }) {
    return (
        <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.primary.highlight"
            size="xl"
            {...props}
        />
    );
}
