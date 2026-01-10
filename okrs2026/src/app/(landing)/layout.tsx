import "../globals.css";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main {...{ className: "w-full" }}>{children}</main>
      <Footer />
    </>
  );
}
