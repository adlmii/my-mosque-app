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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* === LOGO (Font Serif) === */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold font-serif shadow-sm">
            M
          </div>
          <Link href="/" className="flex flex-col">
            <span className="font-serif font-bold text-lg leading-none tracking-tight text-slate-900">
              Al-Ikhlas
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-sans font-medium">
              Pusat Peradaban
            </span>
          </Link>
        </div>

        {/* === MENU DESKTOP (Font Sans) === */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary font-sans",
                pathname === item.href
                  ? "text-primary font-bold"
                  : "text-slate-600"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* === BUTTONS === */}
        <div className="flex items-center gap-4">
          <Button size="sm" className="hidden sm:flex bg-primary hover:bg-primary/90 text-white font-sans gap-2 shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5">
            <Heart className="w-4 h-4 fill-current" />
            Infaq
          </Button>

          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* === MOBILE MENU === */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white p-4 absolute w-full shadow-xl flex flex-col gap-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "px-4 py-3 rounded-md text-sm font-medium transition-colors font-sans",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-slate-50 text-slate-600"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button className="w-full mt-2 gap-2 font-sans bg-primary text-white">
            <Heart className="w-4 h-4 fill-current" />
            Infaq Sekarang
          </Button>
        </div>
      )}
    </header>
  );
}