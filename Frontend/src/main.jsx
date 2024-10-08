import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import "@/index.css";  // Updated to use @ alias
import { ThemeProvider } from "@/components/theme-provider.jsx";  // Updated to use correct casing
import { store } from "@/store/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>  
    <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
