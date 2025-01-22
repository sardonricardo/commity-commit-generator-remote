import federation from "@originjs/vite-plugin-federation";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "commit-generator-remote",
			filename: "remoteEntry.js",
			exposes: {
				"./Header": "./src/components/Header",
			},
			remotes: {},
			shared: ["react", "react-dom"],
		}),
	],
	build: {
		modulePreload: false,
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
	},
});
