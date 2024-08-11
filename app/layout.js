import { Cabin } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";

const inter = Cabin({ subsets: ["latin"], weight:['400','500','600','700']});

export const metadata = {
  title: "MediSense",
  description: "Enlightening Health, Empowering Lives",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
