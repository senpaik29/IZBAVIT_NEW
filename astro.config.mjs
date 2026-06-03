import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://senpaik29.github.io",
  base: "/IZBAVIT_NEW",
  trailingSlash: "ignore",
  server: {
    port: 4321,
    host: true,
  },
  build: {
    inlineStylesheets: "auto",
  },
});
