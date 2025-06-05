import "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        role: string | undefined | null;
    }

    interface Session {
        user: User;
    }
}
