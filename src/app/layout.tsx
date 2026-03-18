import type { Metadata } from "next";
import { Dancing_Script, Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anagha Bhandare — Trend Analyst",
  description: "Portfolio of Anagha Bhandare, Trend Analyst. Fashion forecasting, cultural intelligence, and data-driven style insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} ${cormorant.variable} ${dmSans.variable} font-sans antialiased bg-white text-black`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
