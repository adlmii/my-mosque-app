import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border/60 pt-20 pb-10 font-optimized">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          
          {/* 1. BRAND & DESKRIPSI */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold font-serif text-xl shadow-sm">
                M
              </div>
              <span className="font-serif font-bold text-2xl text-foreground">
                Al-Ikhlas
              </span>
            </div>
            <p className="text-small text-muted-foreground max-w-xs">
              Membangun peradaban umat melalui masjid yang makmur, modern, dan rahmatan lil 'alamin.
            </p>
            <div className="flex gap-3 pt-2">
              <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Youtube className="w-4 h-4" />} />
            </div>
          </div>

          {/* 2. TAUTAN CEPAT */}
          <div>
            <h5 className="font-serif font-bold text-foreground mb-6 text-lg">Jelajahi</h5>
            <ul className="space-y-4">
              <li><Link href="/profil" className="text-small text-muted-foreground hover:text-primary transition-colors">Profil Masjid</Link></li>
              <li><Link href="/jadwal" className="text-small text-muted-foreground hover:text-primary transition-colors">Jadwal Sholat</Link></li>
              <li><Link href="/kegiatan" className="text-small text-muted-foreground hover:text-primary transition-colors">Agenda Kegiatan</Link></li>
              <li><Link href="/laporan" className="text-small text-muted-foreground hover:text-primary transition-colors">Laporan Keuangan</Link></li>
            </ul>
          </div>

          {/* 3. LAYANAN UMAT */}
          <div>
            <h5 className="font-serif font-bold text-foreground mb-6 text-lg">Layanan</h5>
            <ul className="space-y-4">
              <li><Link href="#" className="text-small text-muted-foreground hover:text-primary transition-colors">Layanan Jenazah</Link></li>
              <li><Link href="#" className="text-small text-muted-foreground hover:text-primary transition-colors">Sewa Aula</Link></li>
              <li><Link href="#" className="text-small text-muted-foreground hover:text-primary transition-colors">Konsultasi Syariah</Link></li>
              <li><Link href="#" className="text-small text-muted-foreground hover:text-primary transition-colors">Pendaftaran TPA</Link></li>
            </ul>
          </div>

          {/* 4. KONTAK */}
          <div>
            <h5 className="font-serif font-bold text-foreground mb-6 text-lg">Hubungi Kami</h5>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-small text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Jl. Damai Sejahtera No. 99, Jakarta Selatan, 12345</span>
              </li>
              <li className="flex items-center gap-3 text-small text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3 text-small text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>sekretariat@alikhlas.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs-custom">© {currentYear} Masjid Al-Ikhlas. All rights reserved.</p>
          <div className="flex gap-8 text-xs-custom font-medium">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      // Mengubah bg-slate-50 menjadi bg-secondary (Sage Mist) agar lembut
      className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {icon}
    </Link>
  )
}