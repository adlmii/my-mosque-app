"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Kegiatan", href: "/kegiatan" },
    { name: "Jadwal Sholat", href: "/jadwal" },
    { name: "Profil", href: "/profil" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/80 backdrop-blur-md shadow-sm font-optimized supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* === LOGO === */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold font-serif text-xl shadow-sm group-hover:shadow-md transition-all duration-300">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl leading-none text-foreground group-hover:text-primary transition-colors">
                Al-Huda
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans font-bold mt-1">
                Pusat Peradaban
              </span>
            </div>
          </Link>

          {/* === MENU DESKTOP === */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 font-sans tracking-wide",
                  pathname === item.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* === CTA BUTTON === */}
          <div className="flex items-center gap-4">
            <Button 
              size="sm" 
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-white font-sans font-bold gap-2 shadow-md hover:shadow-lg transition-all px-6 h-10 rounded-full btn-text"
            >
              <Heart className="w-4 h-4 fill-current" />
              Infaq
            </Button>

            <button
              className="md:hidden p-2 text-muted-foreground hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* === MOBILE MENU === */}
      {isOpen && (
        <div className="md:hidden border-t border-border/60 bg-white shadow-xl animate-accordion-down">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-4 rounded-xl text-base font-semibold transition-all font-sans",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button className="w-full mt-4 h-12 gap-2 font-sans font-bold bg-primary hover:bg-primary/90 text-white rounded-xl">
              <Heart className="w-5 h-5 fill-current" />
              Infaq Sekarang
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}