
import fp from "fastify-plugin";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import path from "path";

export default fp(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "public"),
    prefix: "/public/",
  });

  fastify.register(fastifyView, {
    engine: { ejs: require("ejs") },
    root: path.join(__dirname, "..", "views"),
    layout: "layout.ejs",
  });
});
