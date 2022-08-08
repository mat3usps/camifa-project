import type { User } from "~/models/User";
import { useMatchesData } from "./useMatchesData";

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string";
}
