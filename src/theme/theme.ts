import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
      fontFamily: ["Inter", "Lemon", "Libre Baskerville", "Protest Strike", "sans-serif", "Patua One"].join(),
      h1: { fontFamily: "Lemon, serif" },
      h2: { fontFamily: "Lemon, serif" },
      body1: { fontFamily: "Inter, sans-serif" },
      body2: { fontFamily: "Libre Baskerville, serif" },
    },
    palette: {
      primary: {
        main: "#2DC98A", // Green shade
      },
      secondary: {
        main: "#101921", // black shade
      },
    },
  });

export default theme;
