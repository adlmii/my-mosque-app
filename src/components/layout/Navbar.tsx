import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react"; 

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-90 transition-opacity">
          <Landmark className="h-6 w-6 shrink-0" />
          <span>Masjid Al-Ikhlas</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground">
            Beranda
          </Link>
          <Link href="/jadwal" className="text-foreground/60 transition-colors hover:text-foreground">
            Jadwal Sholat
          </Link>
          <Link href="/kegiatan" className="text-foreground/60 transition-colors hover:text-foreground">
            Info Kegiatan
          </Link>
          <Link href="/profil" className="text-foreground/60 transition-colors hover:text-foreground">
            Profil
          </Link>
        </nav>

        {/* Tombol Aksi */}
        <div className="flex items-center gap-4">
          <Button variant="default" size="sm">
            Donasi Sekarang
          </Button>
        </div>
      </div>
    </header>
  );
}