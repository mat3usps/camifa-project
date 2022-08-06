import { createCookie } from "@remix-run/node";
import { isProductionEnvironment } from "~/utils/utils";

export const userPreferences = createCookie("userPreferences", {
  maxAge: 604_800, // 1 week
  secure: isProductionEnvironment(),
});
