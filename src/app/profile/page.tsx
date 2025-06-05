"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";

type Service = {
    id: string;
    title: string;
    date: string;
};

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchServices = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/services/list`);
            if (res.ok) {
                const data = await res.json();
                setServices(data.services || []);
            }
        };

        if (status === "authenticated") {
            fetchServices();
        }
    }, [status]);

    if (status === "loading") {
        return <Loader />;
    }

    if (status !== "authenticated") {
        return null;
    }

    const user = session?.user;

    return (
        <div className="container">
            <h1>Welcome, {user?.name || user?.email}!</h1>
            <button className="button button__primary" onClick={() => signOut()}>Logout</button>

            <h2>Your services</h2>
            {services.length > 0 ? (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {services.map((appt) => (
                        <li key={appt.id}>
                            <strong>{appt.title}</strong> — {appt.date}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No services yet.</p>
            )}
        </div>
    );
}
