"use client";

import { Navbar } from "./Navbar";
import "./i18n";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // You can add your useQuery and other client-side logic here

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
