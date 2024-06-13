import { DefaultSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session extends Default {
    accessToken: string;
    refreshToken: string;
    id: string;
    expires: number;
  }
}
