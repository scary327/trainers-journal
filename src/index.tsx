import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

const root = document.getElementById("root");

if (!root) {
    throw new Error("root not found");
}

const container = createRoot(root);

container.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
