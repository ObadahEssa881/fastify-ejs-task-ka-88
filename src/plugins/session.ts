import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";

export default fp(async (fastify) => {
  const SESSION_SECRET = process.env.SESSION_SECRET;

  if (!SESSION_SECRET) {
    throw new Error("SESSION_SECRET missing in env");
  }

  fastify.register(fastifyCookie);

  fastify.register(fastifySession, {
    secret: SESSION_SECRET,
    cookie: {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  });
});
