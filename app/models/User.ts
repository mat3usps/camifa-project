import type { User as UserFromPrisma } from "@prisma/client";

export type User = UserFromPrisma;

export type UserEmail = User["email"];
export type UserId = User["id"];
