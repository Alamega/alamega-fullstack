import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Menu from "./menu";
import Navbar from "./navbar";
import Clock from "./clock";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Аламегово чё то",
  description: "Аламегово чё то там",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <div className="container">
          <header>
            <Link href="/">
              <h1>Alamega</h1>
            </Link>

            <Clock />

            <Navbar />
          </header>

          <div className="full-wrapper">
            <div className="content">{children}</div>
            <div className="sidebar">
              <Menu />
            </div>
          </div>

          <footer>
            <p>Made by Alamega</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
