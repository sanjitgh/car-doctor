"use client";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvaider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
