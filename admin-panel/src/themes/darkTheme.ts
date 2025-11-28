// src/themes/darkTheme.ts
import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  typography: {
    fontFamily: '"Niramit"'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#242C39',
          margin: 0,
          padding: 0,
          minHeight: '100vh',
        },
        '@font-face': [
          {
            fontFamily: 'Niramit',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 700,
            src: `url('/src/assets/fonts/niramit/Niramit-Bold.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Niramit',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 400,
            src: `url('/src/assets/fonts/niramit/Niramit-Regular.ttf') format('truetype')`,
          },
        ],
      },
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: '#242C39',
      paper: '#242C39',
    },
  },
});