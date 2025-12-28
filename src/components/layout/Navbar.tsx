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
    { name: "Profil", href: "/profil" },
    { name: "Jadwal Sholat", href: "/jadwal" },
    { name: "Kegiatan", href: "/kegiatan" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* === LOGO === */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold font-serif shadow-sm group-hover:shadow-md transition-shadow">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-tight tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                Al-Ikhlas
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-slate-500 font-sans font-semibold">
                Pusat Peradaban
              </span>
            </div>
          </Link>

          {/* === MENU DESKTOP === */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 font-sans",
                  pathname === item.href
                    ? "text-primary bg-primary/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* === CTA BUTTON === */}
          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-white font-sans font-semibold gap-2 shadow-sm hover:shadow-md transition-all"
            >
              <Heart className="w-4 h-4 fill-current" />
              Infaq
            </Button>

            <button
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* === MOBILE MENU === */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-semibold transition-all font-sans",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button className="w-full mt-3 gap-2 font-sans font-semibold bg-primary hover:bg-primary/90 text-white">
              <Heart className="w-4 h-4 fill-current" />
              Infaq Sekarang
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}