"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./i18n";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <ToastContainer
          {...{
            autoClose: 3000,
            position: "top-right",
            newestOnTop: true,
            theme: "light",
            hideProgressBar: true,
          }}
        />
        {children}
      </body>
    </html>
  );
}
