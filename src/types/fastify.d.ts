import "fastify";
import "@fastify/session";

declare module "fastify" {
  interface FastifyInstance {
    t(lang: string, key: string): string;
    ensureAuth(req: FastifyRequest, reply: FastifyReply): Promise<void>;
  }

  interface FastifyReply {
    locals?: Record<string, any>;
  }
}

declare module "@fastify/session" {
  interface FastifySessionObject {
    user?: {
      id: number;
      email: string;
      name: string;
    };
    token?: string;
  }
}
