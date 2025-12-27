import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. BRAND & DESKRIPSI */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold font-serif">
                M
              </div>
              <span className="font-serif font-bold text-xl text-slate-900">
                Al-Ikhlas
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Membangun peradaban umat melalui masjid yang makmur, modern, dan rahmatan lil 'alamin.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Youtube className="w-4 h-4" />} />
            </div>
          </div>

          {/* 2. TAUTAN CEPAT */}
          <div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">Jelajahi</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/profil" className="hover:text-primary transition-colors">Profil Masjid</Link></li>
              <li><Link href="/jadwal" className="hover:text-primary transition-colors">Jadwal Sholat</Link></li>
              <li><Link href="/kegiatan" className="hover:text-primary transition-colors">Agenda Kegiatan</Link></li>
              <li><Link href="/laporan" className="hover:text-primary transition-colors">Laporan Keuangan</Link></li>
            </ul>
          </div>

          {/* 3. LAYANAN UMAT */}
          <div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">Layanan</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-primary transition-colors">Layanan Jenazah</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Sewa Aula</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Konsultasi Syariah</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Pendaftaran TPA</Link></li>
            </ul>
          </div>

          {/* 4. KONTAK */}
          <div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Jl. Damai Sejahtera No. 99, Jakarta Selatan, 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>sekretariat@alikhlas.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-sans">
          <p>© {currentYear} Masjid Al-Ikhlas. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-900">Terms of Service</Link>
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
      className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all duration-300"
    >
      {icon}
    </Link>
  )
}