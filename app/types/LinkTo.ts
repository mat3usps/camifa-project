import type { Link } from "@remix-run/react";
import type { ComponentProps } from "react";

export type LinkTo = ComponentProps<typeof Link>["to"];
