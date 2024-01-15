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
		secondary: {
			main: "#ff4081",
		},
		background: {
			default: "#0f0f0f",
			paper: "#1a1a1a", // customize paper color for components like cards
		},
		text: {
			primary: "#000000", // customize text color for primary content
			secondary: "#a0a0a0", // customize text color for secondary content
		},
	},
});

export default theme;
