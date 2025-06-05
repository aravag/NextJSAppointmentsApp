"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import styles from "@styles/auth.module.css";
import Loader from "@/app/components/Loader";

type ValidationState = {
    hasLength: boolean;
    hasNumber: boolean;
    hasLowercase: boolean;
    hasUppercase: boolean;
};

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<'user' | 'company'>('user');
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [validation, setValidation] = useState<ValidationState>({
        hasLength: false,
        hasNumber: false,
        hasLowercase: false,
        hasUppercase: false,
    });
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/profile");
        }
    }, [status, router]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        setValidation({
            hasLength: password.length >= 8,
            hasNumber: /\d/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasUppercase: /[A-Z]/.test(password),
        });
    };

    const handleRegister = async () => {
        setEmailError("");
        setNameError("");

        if (!name.trim()) {
            setNameError("Name cannot be empty");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email (e.g., user@gmail.com)");
            return;
        }

        const isPasswordValid = Object.values(validation).every(Boolean);
        if (!isPasswordValid) {
            alert("Password does not meet requirements");
            return;
        }

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ email, password, name, role }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            await signIn("credentials", { redirect: false, email, password });
            router.push("/profile");
        } else {
            const data = await res.json();
            alert(data.error || "Registration failed");
        }
    };

    if (status === "loading") {
        return <Loader />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className={styles.input} />
                {nameError && <div className={styles.error}>{nameError}</div>}
            </div>

            <div className={styles.inputGroup}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className={styles.input} />
                {emailError && <div className={styles.error}>{emailError}</div>}
            </div>

            <div className={styles.inputGroup}>
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value as 'user' | 'company')} 
                    className={styles.input}
                >
                    <option value="user">User</option>
                    <option value="company">Company</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                    }}
                    placeholder='Password'
                    className={styles.input}
                />
                <div className={styles.validationList}>
                    <div className={validation.hasLength ? styles.valid : styles.invalid}>✓ At least 8 characters</div>
                    <div className={validation.hasNumber ? styles.valid : styles.invalid}>✓ At least 1 number</div>
                    <div className={validation.hasLowercase ? styles.valid : styles.invalid}>✓ At least 1 lowercase letter</div>
                    <div className={validation.hasUppercase ? styles.valid : styles.invalid}>✓ At least 1 uppercase letter</div>
                </div>
            </div>

            <button onClick={handleRegister} className={styles.button}>
                Register
            </button>
            <div className={styles.linkContainer}>
                Already have an account? <Link href='/login'>Login</Link>
            </div>
        </div>
    );
}
