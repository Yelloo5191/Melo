/* theme.ts */
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-poly)",
    body: "var(--font-poly)",
  },
  colors: {
    brand: {
      primary: {
        highlight: "#5032a8",
        text: "#fff",
      },
      secondary: {
        highlight: "#b3b3b3",
        text: "#b3b3b3",
      },
      darks: {
        light: "#535353",
        medium: "#212121",
        dark: "#121212",
      },
      logo: {
        background: "#000724",
        text: "#fffee7",
        light: "#333b5f",
      },
    },
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "var(--chakra-colors-brand-darks-dark)",
        color: "var(--chakra-colors-brand-secondary-text)",
      },
      "h1, h2, h3, h4, h5, h6": {
        color: "var(--chakra-colors-brand-primary-text)",
      },
      ".dropdown-item": {
        "&:hover": {
          background: "var(--chakra-colors-brand-darks-dark) !important",
        },
      },
    },
  },
});
