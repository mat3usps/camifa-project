import type { UserEmail, UserId } from "~/models/User";

import bcrypt from "bcryptjs";

import { prisma } from "~/server/db.server";

export async function getUserById(id: UserId) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: UserEmail) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: UserEmail, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: UserEmail) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(email: UserEmail, password: string) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
