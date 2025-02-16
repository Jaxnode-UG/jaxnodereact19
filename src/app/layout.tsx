import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from 'next/image';
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="bg-gray-100 text-gray-900">
          <header className="bg-gray-800 text-white">
            <div className="container mx-auto py-6">
              <Link href="/">
                <Image src="/jaxnode.png" alt="JaxNode Logo" width="120" height="12" className="mb-6" />
              </Link>
              
              <h1 className="text-3xl font-bold">React 19 examples</h1>
            </div>
          </header>
        </div>
        <div className="pt-6">
          {children}
        </div>
        
      </body>
    </html>
  );
}
