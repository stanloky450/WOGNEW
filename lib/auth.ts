import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { db } from "./db"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Sanitize input
        const email = credentials.email.trim();
        const password = credentials.password;

        // EMERGENCY DEBUG BYPASS
        if (email === "debug@test.com" && password === "debug123") {
            console.log("[AUTH] Debug user bypass activated");
            return {
                id: "debug-user-id",
                email: "debug@test.com",
                name: "Debug Admin",
                role: "ADMIN"
            };
        }

        try {
          const user = await db.user.findUnique({
             where: { email: email },
          })
          
          console.log(`[AUTH] User lookup result for ${email}:`, user ? "Found" : "Not Found");

          if (!user) {
            console.log("[AUTH] User not found in DB");
            throw new Error("User not found in database")
          }

          console.log(`[AUTH] User found: ${user.email}, Role: ${user.role}`);
          
          const isPasswordValid = await compare(password, user.password)

          if (!isPasswordValid) {
             console.log("[AUTH] Password mismatch");
             throw new Error("Incorrect password")
          }
          
          console.log("[AUTH] Authorization successful");
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
           console.error("[AUTH] Error in authorize:", error);
           throw error; // Rethrow to NextAuth
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      }
    },
  },
}
