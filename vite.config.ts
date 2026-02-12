import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isTest = process.env.NODE_ENV === "test" || process.env.VITEST;

export default defineConfig({
  plugins: [
    tailwindcss(),
    isTest ? react() : reactRouter(),
    tsconfigPaths(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["app/**/*.test.{ts,tsx}"],
    setupFiles: ["./app/test-setup.ts"],
  },
});
