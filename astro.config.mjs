import { defineConfig } from "astro/config";

export default defineConfig({
  site: "http://izbavit.ru",
  trailingSlash: "ignore",
  server: {
    port: 4321,
    host: true,
  },
  build: {
    inlineStylesheets: "auto",
  },
});
