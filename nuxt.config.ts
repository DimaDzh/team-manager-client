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
  routeRules: {
    "/api/**": {
      cors: true,
    },
  },
  css: ["./app/assets/css/main.css"],
});
