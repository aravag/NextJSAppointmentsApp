import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const authOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
