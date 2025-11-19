import fp from "fastify-plugin";

export default fp(async function (app) {
  app.addHook("preHandler", (req, reply, done) => {
    const lang = (req.params as any)?.lang;
    if (lang) {
      reply.locals = reply.locals || {};
      reply.locals.lang = lang;
      reply.locals.originalPath = req.url.replace(`/${lang}`, "");
    }
    done();
  });
});
