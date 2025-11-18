import fp from "fastify-plugin";
import fs from "fs";
import fastifySecureSession from "fastify-secure-session";

export default fp(async (fastify) => {
  const secretFile = process.env.SESSION_SECRET || "./session-secret.key";
  if (!fs.existsSync(secretFile)) {
    throw new Error(
      `Session secret file not found: ${secretFile}. Generate via: head -c 32 /dev/urandom > ${secretFile}`
    );
  }
  const key = fs.readFileSync(secretFile);
  fastify.register(fastifySecureSession, {
    key,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, 
    },
  });
});
