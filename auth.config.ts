import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedField = LoginSchema.safeParse(credentials);

        if (validatedField.success) {
          const { email, password } = validatedField.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
