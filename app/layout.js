<<<<<<< HEAD
import { Cabin, Roboto, Space_Grotesk } from "next/font/google";
=======
import { Cabin, Roboto } from "next/font/google";
>>>>>>> 5d9cf0ae87a41b3f4cb78921ac1ff83ea722358c
import "./globals.css";
import ConditionalNavbar from "@/Components/ConditionalNavbar";


const inter = Cabin({ subsets: ["latin"], weight: ['400', '500', '600', '700'] });

export const metadata = {
  title: "MediSense",
  description: "Enlightening Health, Empowering Lives",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-y-scroll no-scrollbar">
      <body className={inter.className}>
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
