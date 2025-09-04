import type { NextAuthOptions, User as NextAuthUser, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const email = (credentials?.email || "").toString().toLowerCase().trim();
        if (!email) return null;
        // Upsert user by email
        const user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: { email },
        });
        const authUser: NextAuthUser = { id: user.id, email: user.email ?? undefined, name: user.name ?? undefined } as unknown as NextAuthUser;
        return authUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser | null }) {
      if (user?.id) token.sub = String(user.id);
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const sid = token.sub ?? null;
      if (session.user) {
        (session.user as unknown as { id?: string | null }).id = sid;
      } else {
        (session as unknown as { user: { id: string | null } }).user = { id: sid };
      }
      return session;
    },
  },
};

