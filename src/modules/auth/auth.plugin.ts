// src/modules/auth/auth.plugin.ts
import fp from "fastify-plugin";
import { ensureAuth } from "./auth.middleware";

export default fp(async (fastify) => {
  fastify.decorate("ensureAuth", ensureAuth);
});
