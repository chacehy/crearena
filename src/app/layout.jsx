import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Crearena — Elite Business Accelerator | Startups start here!",
  description: "Crearena is an elite business accelerator where high-value collective intelligence meets top-tier mentorship, multidisciplinary coaching, and premium collaborative workspaces.",
  keywords: ["business accelerator", "incubator", "venture capital", "startups", "collective intelligence", "mentorship", "premium workspaces", "luxury tech"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

