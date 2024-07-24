import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Workshop App",
  description: "Cars Workshop",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
