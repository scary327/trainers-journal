import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import React from "react";

const root = document.getElementById("root");

if (!root) {
    throw new Error("root не найден!");
}

const container = createRoot(root);

container.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
