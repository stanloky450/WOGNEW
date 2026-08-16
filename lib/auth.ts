import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "./db";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface User {
		role?: string;
	}
	// interface Session {
	// 	user: {
	// 		id?: string;
	// 		role?: string;
	// 	} & DefaultSession["user"];
	// }
}

declare module "next-auth/jwt" {
	interface JWT {
		id?: string;
		role?: string;
	}
}

import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/signin",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-client-id",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder-client-secret",
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Invalid credentials");
				}

				const user = await db.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) {
					throw new Error("User not found");
				}

				if (!user.password) {
					throw new Error("This account is registered via social login. Please sign in with Google.");
				}

				const isPasswordValid = await compare(
					credentials.password,
					user.password,
				);

				if (!isPasswordValid) {
					throw new Error("Invalid password");
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					role: user.role,
				};
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === "google") {
				const email = user.email;
				if (!email) return false;

				// Check if user already exists in db by email
				const existingUser = await db.user.findUnique({
					where: { email },
				});

				if (existingUser) {
					// Link Google account with existing user where appropriate
					const updateData: any = {};
					if (!existingUser.image && user.image) {
						updateData.image = user.image;
					}
					if (!existingUser.name && user.name) {
						updateData.name = user.name;
					}
					if (existingUser.provider !== "google") {
						updateData.provider = "google";
					}

					if (Object.keys(updateData).length > 0) {
						await db.user.update({
							where: { id: existingUser.id },
							data: updateData,
						});
					}

					user.id = existingUser.id;
					user.role = existingUser.role;
				} else {
					// Google users automatically receive the default "USER" role
					const newUser = await db.user.create({
						data: {
							email,
							name: user.name || null,
							image: user.image || null,
							role: "USER",
							provider: "google",
						},
					});
					user.id = newUser.id;
					user.role = newUser.role;
				}
			}
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					id: user.id,
					role: user.role,
				};
			}
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					role: token.role,
				},
			};
		},
	},
};
