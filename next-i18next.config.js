module.exports = {
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
}
