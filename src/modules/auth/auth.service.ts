import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { CreateUserDtoType } from "./dto/create-user.dto";

const JWT_SECRET = process.env.JWT_SECRET || "replace-me";

export default class AuthService {
  static async createUser(
    prisma: PrismaClient,
    data: CreateUserDtoType
  ): Promise<User> {
    const exists = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (exists) throw new Error("Email already in use");

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashed,
        name: data.name ?? "",
      },
    });
    return user;
  }

  static async validateUser(
    prisma: PrismaClient,
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    return ok ? user : null;
  }

  static generateJwt(user: User) {
    return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
  }

  static verifyJwt(token: string): { sub: number; email: string } {
    return jwt.verify(token, JWT_SECRET) as any;
  }
}
