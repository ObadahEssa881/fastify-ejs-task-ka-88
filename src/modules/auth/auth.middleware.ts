// src/modules/auth/auth.middleware.ts
import { FastifyReply, FastifyRequest } from "fastify";
import AuthService from "./auth.service";

export async function ensureAuth(req: FastifyRequest, reply: FastifyReply) {
  const session = req.session;
  const tokenFromSession = session?.token ?? null;
  const authHeader = req.headers.authorization;
  const tokenFromHeader = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;

  const token = tokenFromSession || tokenFromHeader;

  if (!token) {
    const lang = (req.params as any)?.lang || "en";
    return reply.redirect(`/${lang}/login`);
  }

  try {
    const payload = AuthService.verifyJwt(token as string);

    const user = await req.server.prisma.user.findUnique({
      where: { id: Number(payload.sub) },
    });

    if (!user) {
      const lang = (req.params as any)?.lang || "en";
      return reply.redirect(`/${lang}/login`);
    }

    // Attach user to session
    req.session.user = { id: user.id, email: user.email, name: user.name! };
  } catch (err) {
    const lang = (req.params as any)?.lang || "en";
    return reply.redirect(`/${lang}/login`);
  }
}
