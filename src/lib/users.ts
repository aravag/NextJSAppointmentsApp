import fs from "fs";
import path from "path";

export type Service = {
    id: string;
    date: string;
    title: string;
};

export type User = {
    id: string;
    email: string;
    password?: string;
    name?: string;
    role: 'user' | 'company';
    companyId?: string;
    services?: Service[];
};

const USERS_PATH = path.join(process.cwd(), "src", "data", "users.json");

export const readUsers = (): User[] => {
    try {
        return JSON.parse(fs.readFileSync(USERS_PATH, "utf-8"));
    } catch {
        return [];
    }
};

export const writeUsers = (users: User[]) => {
    fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
};

export const updateUser = (updatedUser: User) => {
    const users = readUsers().map(u => u.id === updatedUser.id ? updatedUser : u);
    writeUsers(users);
};

export const findUserByEmail = (email: string) => {
    return readUsers().find((u) => u.email === email);
};

export const addUser = (user: User) => {
    const users = readUsers();
    users.push(user);
    writeUsers(users);
    return user;
};