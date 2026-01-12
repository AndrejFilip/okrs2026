import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
import { User } from "./lib/types/types";

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
          const [rows] = await db.execute(
            `SELECT * FROM Users WHERE email = ?`,
            [credentials.email]
          );
          const users = rows as User[];

          if (users.length === 0) {
            return null;
          }

          const user = users[0];

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
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
          //verify if user exists
          const [rows] = await db.execute(
            `SELECT * FROM Users WHERE email = ?`,
            [user.email]
          );
          const users = rows as User[];

          if (users.length === 0) {
            await db.execute(
              "INSERT INTO Users (name, email, google_id) VALUES (?, ?, ?)",
              [user.name, user.email, user.id]
            );
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
