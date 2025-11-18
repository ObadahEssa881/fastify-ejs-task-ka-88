import fp from "fastify-plugin";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import path from "path";

export default fp(async (fastify) => {
  await i18next.use(Backend).init({
    lng: process.env.DEFAULT_LANG || "ar",
    fallbackLng: "en",
    backend: {
      loadPath: path.join(__dirname, "..", "locales", "{{lng}}.json"),
    },
  });

  fastify.decorate("i18n", i18next);
});
