import Fastify from "fastify";
import formbody from "@fastify/formbody";
import viewPlugin from "./plugins/view";
import sessionPlugin from "./plugins/session";
import i18nPlugin from "./plugins/i18n";
import prismaPlugin from "./plugins/prisma";

const app = Fastify({ logger: true });

app.register(formbody);
app.register(viewPlugin);
app.register(sessionPlugin);
app.register(i18nPlugin);
app.register(prismaPlugin);

app.register(async function (instance, opts) {
  instance.get("/", async (req, reply) => {
    const defaultLang = process.env.DEFAULT_LANG ?? "ar";
    return reply.redirect(`/${defaultLang}`);
  });

  instance.get("/:lang", async (req, reply) => {
    const lang = (req.params as any).lang;

    return reply.view("index.ejs", { lang });
  });
});

export default app;
