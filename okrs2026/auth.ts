import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/db";
import { stats, users, type User } from "./lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Drizzle: SELECT * FROM Users WHERE email = ?
          const user: User = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email as string))
            .limit(1)
            .then((rows) => rows[0]);

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password as string,
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Drizzle: Check if user exists
          const existingUser: User | undefined = await db
            .select()
            .from(users)
            .where(eq(users.email, user.email as string))
            .limit(1)
            .then((rows) => rows[0]);

          if (existingUser) {
            user.id = existingUser.id.toString();
          } else {
            // Drizzle: INSERT new Google user
            const [newUser] = await db
              .insert(users)
              .values({
                google_id: user.id,
                email: user.email as string,
                password: null,
                name: user.name as string,
                bike: null,
              })
              .$returningId();

            // Priradíme nové ID z databázy
            user.id = newUser.id.toString();

            await db.insert(stats).values({
              user_id: newUser.id,
              kilometers: 0,
              elevation: 0,
              calories: 0,
            });
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false; // Return false to indicate failure
        }
      }
      // allow to sign in for google and credentials
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
