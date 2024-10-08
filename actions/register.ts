"use server";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

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

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email Sent!" };
};
