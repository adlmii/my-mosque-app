import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora, Amiri } from "next/font/google"; 
import "./globals.css";
import { cn } from "@/lib/utils";
import { MASJID_INFO } from "@/lib/data-masjid"; 

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const fontArabic = Amiri({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "700"],
});

// Metadata Dinamis
export const metadata: Metadata = {
  title: {
    default: `${MASJID_INFO.nama} | ${MASJID_INFO.tagline}`,
    template: `%s | ${MASJID_INFO.nama}`,
  },
  description: `Portal resmi ${MASJID_INFO.nama}. ${MASJID_INFO.alamat}`,
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
        fontSerif.variable,
        fontArabic.variable
      )}>
        {children}
      </body>
    </html>
  );
}