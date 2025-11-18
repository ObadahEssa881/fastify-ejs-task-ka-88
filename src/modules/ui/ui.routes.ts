import { FastifyInstance } from "fastify";

export default async function uiRoutes(app: FastifyInstance) {
  app.get("/:lang", async (req, reply) => reply.view("/pages/index.ejs"));
  app.get("/:lang/signup", async (req, reply) =>
    reply.view("/pages/signup.ejs")
  );
  app.get("/:lang/login", async (req, reply) => reply.view("/pages/login.ejs"));
  app.get("/:lang/dashboard", async (req, reply) =>
    reply.view("/pages/dashboard.ejs")
  );

  // Profile (authenticated)
  app.get(
    "/:lang/profile",
    { preHandler: app.ensureAuth },
    async (req, reply) => {
      const user = req.session.user;
      const lang = (req.params as any).lang;
      return reply.view("/pages/profile.ejs", { user, lang });
    }
  );
}
