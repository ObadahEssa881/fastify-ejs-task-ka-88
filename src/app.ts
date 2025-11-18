import Fastify from "fastify";
import formbody from "@fastify/formbody";
import viewPlugin from "./plugins/view";
import sessionPlugin from "./plugins/session";
import i18nPlugin from "./plugins/i18n";
import prismaPlugin from "./plugins/prisma";
import authRoutes from "./modules/auth/auth.routes";
import uiRoutes from "./modules/ui/ui.routes";
import authPlugin from "./modules/auth/auth.plugin";

const app = Fastify({ logger: true });

app.register(formbody);
app.register(viewPlugin);
app.register(sessionPlugin);
app.register(i18nPlugin);
app.register(prismaPlugin);

app.get("/", async (req, reply) => {
  const defaultLang = process.env.DEFAULT_LANG ?? "ar";
  return reply.redirect(`/${defaultLang}`);
});

app.register(authPlugin);

app.register(uiRoutes);

app.register(authRoutes, { prefix: "/:lang/auth" });

export default app;
