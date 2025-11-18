import { FastifyReply, FastifyRequest } from "fastify";
import AuthService from "./auth.service";

export async function ensureAuth(req: FastifyRequest, reply: FastifyReply) {
  // check session token
  const session = (req as any).session;
  const tokenFromSession = session ? session.get("token") : null;
  const authHeader = req.headers.authorization;
  const tokenFromHeader =
    authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  const token = tokenFromSession || tokenFromHeader;
  if (!token) {
    const lang = (req.params as any)?.lang || "en";
    return reply.redirect(`/${lang}/login`);
  }

  try {
    const payload = AuthService.verifyJwt(token);
    // load user and attach
    const user = await req.server.prisma.user.findUnique({
      where: { id: Number(payload.sub) },
    });
    if (!user) {
      const lang = (req.params as any)?.lang || "en";
      return reply.redirect(`/${lang}/login`);
    }
    (req as any).user = { id: user.id, email: user.email, name: user.name };
    return;
  } catch (err: any) {
    req.log.warn("Invalid token", err);
    const lang = (req.params as any)?.lang || "en";
    return reply.redirect(`/${lang}/login`);
  }
}
