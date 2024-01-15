// theme.js
import { createTheme } from "@mui/material/styles";

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
	palette: {
		primary: {
			main: "#125452",
		},
		background: {
			default: "#000000",
		},
	},
});

export default theme;
