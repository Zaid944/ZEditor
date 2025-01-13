import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@zeditor/common": path.resolve(__dirname, "../common/src"),
            "@mui/material": "@mui/joy",
        },
    },
});
