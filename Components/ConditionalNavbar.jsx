"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  return pathname !== "/Analysis" ? <Navbar /> : null;
}
