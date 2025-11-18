import fp from "fastify-plugin";
import fs from "fs";
import path from "path";
import { FastifyInstance } from "fastify";

export default fp(async (fastify: FastifyInstance) => {
  fastify.decorate("t", (lang: string, key: string) => {
    try {
      const filePath = path.join(__dirname, "..", "locales", `${lang}.json`);
      const raw = fs.readFileSync(filePath, "utf8");
      const json = JSON.parse(raw);
      return json[key] || key;
    } catch {
      return key;
    }
  });

  fastify.addHook("preHandler", async (req, reply) => {
    const lang = (req.params as any)?.lang ?? "en";
    reply.locals = { t: (key: string) => fastify.t(lang, key), lang };
  });
});
