import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora, Amiri } from "next/font/google"; 
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

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

export const metadata: Metadata = {
  title: "Masjid Al-Ikhlas | Pusat Peradaban Umat",
  description: "Portal resmi Masjid Al-Ikhlas.",
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
        <div className="flex min-h-screen flex-col">
          <Navbar /> 
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}