import React from "react";

import { Image } from "@chakra-ui/react";

const Logo = ({ testId }: any) => (
  <figure className="" title="Next.js" data-testid={testId}>
    <Image
      src="melologoclear.png"
      alt="Melo Logo"
      width="300"
      height="300"
      className="img-fluid"
    />
  </figure>
);

export default Logo;
