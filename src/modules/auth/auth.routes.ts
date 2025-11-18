import { FastifyPluginAsync } from "fastify";
import Controller from "./auth.controller";
import { ensureAuth } from "./auth.middleware";

const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/signup", async (req, reply) =>
    reply.view("auth/signup.ejs", { lang: (req.params as any).lang })
  );
  fastify.post("/signup", Controller.signup);

  fastify.get("/login", async (req, reply) =>
    reply.view("auth/login.ejs", { lang: (req.params as any).lang })
  );
  fastify.post("/login", Controller.login);

  fastify.get("/logout", Controller.logout);


  fastify.get("/dashboard", { preHandler: [ensureAuth] }, Controller.dashboard);
};

export default authRoutes;
