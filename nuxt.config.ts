// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "nuxt-auth-utils",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@vueuse/nuxt",
  ],

  imports: {
    autoImport: true,
  },
  routeRules: {
    "/api/**": {
      cors: true,
    },
  },
  colorMode: {
    preference: "light",
  },
  css: ["./app/assets/css/main.css"],
  runtimeConfig: {
    apiUrl: process.env.NUXT_API_URL || "http://localhost:3030",
    public: {
      apiUrl: process.env.NUXT_API_URL || "http://localhost:3030",
    },
  },
});
