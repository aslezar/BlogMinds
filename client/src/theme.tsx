// theme.js
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
    ].join(","),
  },
})

export default theme
