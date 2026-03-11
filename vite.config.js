var _a, _b;
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";
var isGithubActions = process.env.GITHUB_ACTIONS === "true";
var repository = (_a = process.env.GITHUB_REPOSITORY) !== null && _a !== void 0 ? _a : "";
var repoName = (_b = repository.split("/")[1]) !== null && _b !== void 0 ? _b : "";
var isUserOrOrgPages = repoName.endsWith(".github.io");
var base = isGithubActions ? (isUserOrOrgPages ? "/" : "/".concat(repoName, "/")) : "/";
export default defineConfig({
    base: base,
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.svg"],
            manifest: {
                name: "Dev Matsuri",
                short_name: "Dev Matsuri",
                description: "Privacy-first developer toolbox that runs fully in your browser.",
                theme_color: "#d15031",
                background_color: "#f9f0e4",
                display: "standalone",
                start_url: base,
                scope: base,
                icons: [
                    {
                        src: "pwa-192.svg",
                        sizes: "192x192",
                        type: "image/svg+xml",
                        purpose: "any"
                    },
                    {
                        src: "pwa-512.svg",
                        sizes: "512x512",
                        type: "image/svg+xml",
                        purpose: "any maskable"
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
});
