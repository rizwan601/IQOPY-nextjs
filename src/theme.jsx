import { createTheme, responsiveFontSizes } from "@mui/material";

export const createCustomTheme = (mode) => {
  let theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#00AEEF",
      },
      secondary: {
        main: "#0066CC", // Secondary Blue
      },
      background: {
        default: mode === "light" ? "#E0F7FA" : "#1A1D23", // Light Blue in light mode, Dark Gray in dark mode
      },
      text: {
        primary: "#003366", // Dark Blue
        secondary: "#FFFFFF", // White
      },
    },
    typography: {
      h1: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
        color: mode === "light" ? "#b99a45" : "#E0F7FA", // Primary Blue in light mode, Light Blue in dark mode
        fontSize: "4.4rem", // 70px
        fontWeight: 600,
      },
      h2: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
        color: mode === "light" ? "#b99a45" : "#FFFFFF", // Secondary Blue in light mode, White in dark mode
        fontSize: "2.3rem", // 38px
        fontWeight: 600,
      },
      h3: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
        color: mode === "light" ? "#003366" : "#FFFFFF", // Dark Blue in light mode, White in dark mode
        fontSize: "2rem",
        fontWeight: 700,
      },
      h4: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
        color: mode === "light" ? "#00AEEF" : "#E0F7FA", // Primary Blue in light mode, Light Blue in dark mode
        fontSize: "1.25rem",
        fontWeight: 600,
      },
      h5: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
        color: mode === "light" ? "#0066CC" : "#FFFFFF", // Secondary Blue in light mode, White in dark mode
        fontSize: "1rem",
        fontWeight: 400,
        "@media (max-width:600px)": {
          fontSize: "0.7rem",
          fontWeight: 500,
        },
      },
      h6: {
        fontFamily: ["Inter Variable", "sans-serif"].join(","),
        color: mode === "light" ? "#003366" : "#FFFFFF", // Dark Blue in light mode, White in dark mode
        fontSize: "1rem",
        fontWeight: 400,
        "@media (max-width:600px)": {
          fontSize: "0.75rem",
        },
      },
      // Your other typography styles here
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "#003366", // Dark Blue
          },
          root: {
            [`&:hover .MuiOutlinedInput-notchedOutline`]: {
              borderColor: "#00AEEF", // Primary Blue
            },
            [`&.Mui-focused .MuiOutlinedInput-notchedOutline`]: {
              borderColor: "#00AEEF", // Primary Blue
            },
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
let theme = createCustomTheme()

export default theme;