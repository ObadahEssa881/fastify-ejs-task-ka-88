import { FastifyRequest, FastifyReply } from "fastify";
import AuthService from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";

type ParamsWithLang = { lang?: string };

const signup = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { lang } = req.params as ParamsWithLang;
    const parsed = CreateUserDto.parse(req.body);
    const user = await AuthService.createUser(req.server.prisma, parsed);

    const token = AuthService.generateJwt(user);
    (req as any).session.set("token", token);
    (req as any).session.set("userId", user.id);
    return reply.redirect(`/${lang ?? "en"}/dashboard`);
  } catch (err: any) {
    req.log.error(err);
    const { lang } = req.params as ParamsWithLang;
    return reply.view("auth/signup.ejs", {
      error: err.message || "Signup failed",
      lang,
    });
  }
};

const login = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { lang } = req.params as ParamsWithLang;
    const parsed = LoginDto.parse(req.body);
    const user = await AuthService.validateUser(
      req.server.prisma,
      parsed.email,
      parsed.password
    );
    if (!user) {
      return reply.view("auth/login.ejs", {
        error: "Invalid credentials",
        lang,
      });
    }
    const token = AuthService.generateJwt(user);
    (req as any).session.set("token", token);
    (req as any).session.set("userId", user.id);
    return reply.redirect(`/${lang ?? "en"}/dashboard`);
  } catch (err: any) {
    req.log.error(err);
    const { lang } = req.params as ParamsWithLang;
    return reply.view("auth/login.ejs", {
      error: err.message || "Login failed",
      lang,
    });
  }
};

const logout = async (req: FastifyRequest, reply: FastifyReply) => {
  req.session.destroy();
  const lang = (req.params as any)?.lang || "en";
  return reply.redirect(`/${lang}/login`);
};

const dashboard = async (req: FastifyRequest, reply: FastifyReply) => {
  const { lang } = req.params as ParamsWithLang;
  // ensureAuth should have attached req.user
  const user = (req as any).user;
  return reply.view("dashboard.ejs", { user, lang });
};

export default { signup, login, logout, dashboard };
