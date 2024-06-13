import React from "react";
import { Link } from "@chakra-ui/next-js";

import NavBarItem from "./HeaderItem";

const PageLink = ({
  children,
  href,
  className,
  icon,
  tabIndex,
  testId,
}: any) => {
  return (
    <Link href={href}>
      <NavBarItem
        href={href}
        className={className}
        icon={icon}
        tabIndex={tabIndex}
        testId={testId}
      >
        {children}
      </NavBarItem>
    </Link>
  );
};

export default PageLink;
