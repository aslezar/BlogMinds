/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                highlight: " #9674d4",
                primary: "#fbfdf6",
                secondary: "#e8e8e8",
                accent: "#81ffff",
                dark: "#101356",
            },
        },
    },
    plugins: [],
}
