import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme.tsx"

import { Provider } from "react-redux"
import store from "./store"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
        <Toaster />
    </React.StrictMode>,
)
