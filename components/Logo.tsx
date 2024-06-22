import React from "react";

import { Image } from "@chakra-ui/react";

const Logo = ({ testId }: any) => (
    <figure className="" title="Next.js" data-testid={testId}>
        <Image
            src="melologoclear.png"
            alt="Melo Logo"
            width="auto"
            height={{ base: "300px", md: "600px" }}
            className="img-fluid"
        />
    </figure>
);

export default Logo;
