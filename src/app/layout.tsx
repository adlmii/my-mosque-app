import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Konfigurasi Font
const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Masjid Al-Ikhlas | Pusat Peradaban Umat",
  description: "Portal resmi Masjid Al-Ikhlas.",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${fontSans.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
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