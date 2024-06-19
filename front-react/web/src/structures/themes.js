import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#aa00ff",
      light: "#ff00f0",
    },
    // mode: "dark",
    // primary: {
    //   main: "#ffab00",
    // },
    // secondary: {
    //   main: "#d50000",
    //   light: "#ff00f0",
    // },
  },
});