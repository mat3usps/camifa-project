import type { User } from "@prisma/client";

export type UserEmail = User["email"];
export type UserId = User["id"];

export default User;
