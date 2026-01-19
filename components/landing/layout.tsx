// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NuWica AGE 400™ - Smooth Today, Strong Tomorrow",
  description: "Advanced anti-aging formula for joint health, skin elasticity, and overall vitality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        {children}
        <footer />
      </body>
    </html>
  );
}