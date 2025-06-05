import fs from "fs";
import path from "path";

type Service = {
    id: string,
    name: string,
    description: string,
    duration: number,
    price: number,
    category: string,
    companyId: string,
    companyName: string,
    location: {
        address: string,
        city: string
    }
}

const SERVICES_PATH = path.join(process.cwd(), "src", "data", "services.json");

export const readServices = (): Service[] => {
    try {
        return JSON.parse(fs.readFileSync(SERVICES_PATH, "utf-8"));
    } catch {
        return [];
    }
};

export const findServiceById = (id: string) => {
    return readServices().find((u) => u.id === id);
};