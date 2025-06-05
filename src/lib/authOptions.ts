import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { compare } from "bcrypt";
import { findUserByEmail } from "./users";

interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'company';
}

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                const user = findUserByEmail(credentials.email);
                if (!user?.password) return null;
                const isValid = await compare(credentials.password, user.password);
                if (!isValid) return null;
                return { id: user.id, email: user.email, name: user.name, role: user.role };
            },
        }),
    ],
    pages: { signIn: "/login" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as User;
            return session;
        },
    },
};
