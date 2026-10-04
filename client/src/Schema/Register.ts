import {z} from "zod";

export const RegisterSchema = z.object({
    username: z.string().min(6, { message: "Username must be at least 6 characters" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
export type RegisterFormData = z.infer<typeof RegisterSchema>;