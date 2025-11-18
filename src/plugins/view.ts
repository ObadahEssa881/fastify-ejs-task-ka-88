import fp from "fastify-plugin";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import path from "path";

export default fp(async (fastify) => {
  fastify.register(fastifyView, {
    engine: {
      ejs,
    },
    root: path.join(__dirname, "..", "views"),
    includeViewExtension: true,
  });
});
