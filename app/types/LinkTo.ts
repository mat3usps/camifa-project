import { Link } from "@remix-run/react";
import { ComponentProps } from "react";

export type LinkTo = ComponentProps<typeof Link>["to"];
