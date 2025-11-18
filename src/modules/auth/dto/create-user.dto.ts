import { z } from "zod";

export const CreateUserDto = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().optional(),
});
export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
