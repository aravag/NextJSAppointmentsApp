import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Providers from "./providers";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Appointix",
    description: "Get an appointment",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ru'>
            <body className={inter.variable}>
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
