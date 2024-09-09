"use server";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedField.data;
  const hashPasswrod = await bcrypt.hash(password, 10);
  const exsitingUser = await getUserByEmail(email);
  if (exsitingUser) {
    return { error: "Email already existed!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashPasswrod,
    },
  });

  // TODO: Send Verification token mail

  return { success: "User summoned!" };
};
