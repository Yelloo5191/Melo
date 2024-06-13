import React from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box } from "@chakra-ui/react";

const HeaderItem = ({
  children,
  href,
  className,
  icon,
  tabIndex,
  testId,
}: any) => {
  const pathname = usePathname();
  const activeClass = "navbar-item-active";
  const activeClasses = className ? `${className} ${activeClass}` : activeClass;

  return (
    <Box display="inline-flex" alignItems="center" color="brand.primary.text">
      {icon && <FontAwesomeIcon icon={icon} className="mr-3" />}
      <span
        className={pathname === href ? activeClasses : className}
        tabIndex={tabIndex}
        data-testid={testId}
        style={{ padding: 0, color: "var(--chakra-colors-brand-primary-text)" }}
      >
        {children}
      </span>
    </Box>
  );
};

export default HeaderItem;
