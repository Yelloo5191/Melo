"use client";

import React, { useState } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { chakra, VStack, Button, Box, Heading, Image } from "@chakra-ui/react";

import { useSession, signIn, signOut } from "next-auth/react";
import PageLink from "./PageLink";
import AnchorLink from "./AnchorLink";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const ChakraNavbar = chakra(Navbar);
  const ChakraContainer = chakra(Container);
  const ChakraNavbarToggler = chakra(NavbarToggler);
  const ChakraDropdownMenu = chakra(DropdownMenu);

  const { data: session, status } = useSession();

  const handleSignin = async () => {
    await signIn();
  };

  const handleSignout = async () => {
    await signOut();
  };

  return (
    <Box className="nav-container" data-testid="navbar" width="100%">
      <ChakraNavbar
        backgroundColor="brand.darks.medium"
        light
        expand="md"
        boxShadow="0px 0px 100px var(--chakra-colors-brand-logo-light)"
        width="100%"
      >
        <ChakraContainer
          display="flex"
          width="100%"
          justifyContent="space-between"
        >
          <NavbarBrand className="logo" />
          <ChakraNavbarToggler
            onClick={toggle}
            data-testid="navbar-toggle"
            m={0}
          />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar data-testid="navbar-items">
              <NavItem>
                <PageLink href="/" className="nav-link" testId="navbar-home">
                  Home
                </PageLink>
              </NavItem>
              {session?.user && (
                <>
                  {/* <NavItem>
                    <PageLink href="/csr" className="nav-link" testId="navbar-csr">
                      Client-side rendered page
                    </PageLink>
                  </NavItem>
                  <NavItem>
                    <PageLink href="/ssr" className="nav-link" testId="navbar-ssr">
                      Server-side rendered page
                    </PageLink>
                  </NavItem>
                  <NavItem>
                    <PageLink href="/external" className="nav-link" testId="navbar-external">
                      External API
                    </PageLink>
                  </NavItem> */}
                  <NavItem>
                    <PageLink
                      href="/dashboard"
                      className="nav-link"
                      testId="navbar-dshb"
                    >
                      Dashboard
                    </PageLink>
                  </NavItem>
                </>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {status !== "loading" && !session?.user && (
                <NavItem id="qsLoginBtn">
                  <Button
                    bg="brand.logo.background"
                    _hover={{ bg: "brand.logo.light" }}
                    color="brand.colors.primary.text"
                    boxShadow="0px 0px 100px var(--chakra-colors-brand-logo-light)"
                    variant="outline"
                    size="lg"
                    data-testid="hero-button"
                    onClick={() => {
                      window.location.href = "/api/auth/login";
                    }}
                  >
                    Log in
                  </Button>
                </NavItem>
              )}
              {session?.user && (
                <UncontrolledDropdown
                  nav
                  inNavbar
                  data-testid="navbar-menu-desktop"
                >
                  <VStack justify="end">
                    <DropdownToggle
                      nav
                      caret
                      id="profileDropDown"
                      style={{ padding: 0 }}
                    >
                      <Image
                        src={session?.user.image as string}
                        alt="Profile"
                        className="nav-user-profile rounded-circle"
                        width="50"
                        height="50"
                        data-testid="navbar-picture-desktop"
                      />
                    </DropdownToggle>
                  </VStack>
                  <ChakraDropdownMenu backgroundColor="brand.darks.medium">
                    <DropdownItem
                      data-testid="navbar-user-desktop"
                      style={{ cursor: "auto" }}
                    >
                      <Heading size="sm">{session?.user.name}</Heading>
                    </DropdownItem>
                    <DropdownItem className="" tag="span">
                      <PageLink
                        href="/profile"
                        icon={faUser}
                        testId="navbar-profile-desktop"
                      >
                        Profile
                      </PageLink>
                    </DropdownItem>
                    <DropdownItem id="qsLogoutBtn">
                      <AnchorLink
                        href="/api/auth/logout"
                        icon={faPowerOff}
                        testId="navbar-logout-desktop"
                      >
                        Log out
                      </AnchorLink>
                    </DropdownItem>
                  </ChakraDropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {status !== "loading" && !session?.user && (
              <Nav
                className="d-md-none"
                style={{ padding: 0, margin: 0 }}
                navbar
              >
                <Button
                  bg="brand.logo.background"
                  _hover={{ bg: "brand.logo.light" }}
                  color="brand.colors.primary.text"
                  boxShadow="0px 0px 50px var(--chakra-colors-brand-logo-light)"
                  border="none"
                  variant="outline"
                  data-testid="hero-button"
                  onClick={handleSignin}
                >
                  Log in
                </Button>
              </Nav>
            )}
            {session?.user && (
              <Nav
                id="nav-mobile"
                className="d-md-none justify-content-between"
                navbar
                data-testid="navbar-menu-mobile"
              >
                <NavItem>
                  <span className="user-info">
                    <Image
                      src={session?.user.image as string}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                      height="50"
                      data-testid="navbar-picture-mobile"
                    />
                    <h6
                      className="d-inline-block"
                      data-testid="navbar-user-mobile"
                    >
                      {session?.user.name}
                    </h6>
                  </span>
                </NavItem>
                <NavItem>
                  <PageLink
                    href="/profile"
                    icon={faUser}
                    testId="navbar-profile-mobile"
                  >
                    Profile
                  </PageLink>
                </NavItem>
                <NavItem id="qsLogoutBtn">
                  <AnchorLink
                    onClick={handleSignout}
                    className="btn btn-link p-0"
                    icon={faPowerOff}
                    testId="navbar-logout-mobile"
                  >
                    Log out
                  </AnchorLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </ChakraContainer>
      </ChakraNavbar>
    </Box>
  );
}
// <div>
//   {status !== "authenticated" ? (
//     <button
//       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-10 cursor-pointer"
//       onClick={() => handleSignin()}
//     >
//       Sign in
//     </button>
//   ) : (
//     <>
//       <button
//         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-10 cursor-pointer"
//         onClick={() => handleSignout()}
//       >
//         Sign out
//       </button>
//       {/* <div>{JSON.stringify(session, null, 2)}</div> */}
//     </>
//   )}
//   <h2 className="text-2xl font-bold">Client session</h2>
// </div>;
