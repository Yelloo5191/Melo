import React from "react";

import NavBarItem from "./HeaderItem";

const AnchorLink = ({
  children,
  href,
  className,
  icon,
  tabIndex,
  testId,
}: any) => {
  return (
    <a href={href}>
      <NavBarItem
        href={href}
        className={className}
        icon={icon}
        tabIndex={tabIndex}
        testId={testId}
      >
        {children}
      </NavBarItem>
    </a>
  );
};

export default AnchorLink;
