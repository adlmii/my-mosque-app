import Link from "next/link";
import { Landmark, Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* KOLOM 1: Identitas Masjid */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
              <Landmark className="h-6 w-6" />
              <span>Masjid Al-Ikhlas</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Pusat ibadah dan pengembangan umat yang berlandaskan Al-Quran dan As-Sunnah. Mari makmurkan masjid bersama keluarga tercinta.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* KOLOM 2: Tautan Cepat */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Menu Utama</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/jadwal" className="hover:text-primary transition-colors">Jadwal Sholat</Link>
              </li>
              <li>
                <Link href="/kegiatan" className="hover:text-primary transition-colors">Agenda Kegiatan</Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-primary transition-colors">Profil Masjid</Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: Kontak & Alamat */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>
                  Jl. Kebaikan No. 99, Kelurahan Damai,<br />
                  Jakarta Selatan, Indonesia 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@masjid-alikhlas.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Masjid Al-Ikhlas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}