import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appointments App",
  description: "Get an appointment",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="ru">
      <body className={inter.variable}>
        <SessionProvider session={session}>
          <Header />
          <div className="container">
            {children}
          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
