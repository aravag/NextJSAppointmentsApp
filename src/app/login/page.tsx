"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "@styles/auth.module.css";
import Loader from "@/app/components/Loader";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/profile");
        }
    }, [status, router]);

    const handleLogin = async () => {
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (res?.ok) router.push("/profile");
        else alert("Invalid credentials");
    };

    if (status === "loading") {
        return <Loader />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Email' 
                    className={styles.input} 
                />
            </div>

            <div className={styles.inputGroup}>
                <input 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Password' 
                    className={styles.input} 
                />
            </div>

            <button onClick={handleLogin} className={styles.button}>
                Login
            </button>
            <div className={styles.linkContainer}>
                Don&apos;t have an account? <Link href='/register'>Register</Link>
            </div>
        </div>
    );
}
