import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPrayerTimes } from "@/services/prayer-api";
import { PrayerTimesWidget } from "@/components/features/prayer-times/PrayerTimesWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, MapPin, Heart, Quote, ChevronRight } from "lucide-react";

export default async function HomePage() {
  
  // 1. Fetch Data di Server (Server Side Rendering)
  const jadwalDefault = await getPrayerTimes();

  // Data Dummy untuk Preview Kegiatan di Beranda
  const promoKegiatan = [
    {
      title: "Kajian Rutin Sabtu Malam",
      date: "Sabtu, 19:30 WIB",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop",
      category: "Kajian"
    },
    {
      title: "Jumat Berkah Berbagi",
      date: "Jumat, 11:00 WIB",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop",
      category: "Sosial"
    },
    {
      title: "TPA Anak-Anak Sore",
      date: "Senin-Kamis, 16:00 WIB",
      image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=600&auto=format&fit=crop",
      category: "Pendidikan"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* === SECTION 1: HERO & JADWAL SHOLAT === */}
      {/* Kita beri background pattern halus supaya tidak polosan */}
      <section className="relative py-12 md:py-20 lg:py-28 bg-slate-50 overflow-hidden">
        {/* Dekorasi Background Abstrak */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-primary blur-3xl"></div>
           <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] rounded-full bg-blue-300 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center space-y-6 text-center">
          
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary text-primary bg-primary/5">
            Ahlan Wa Sahlan
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-slate-900">
            Masjid Al-Ikhlas
          </h1>
          <p className="max-w-[700px] text-slate-500 md:text-xl leading-relaxed">
            Menjadi pusat peradaban yang memakmurkan bumi dan menyejukkan hati umat. Mari melangkah bersama menuju ridho-Nya.
          </p>

          {/* WIDGET JADWAL SHOLAT */}
          <PrayerTimesWidget initialData={jadwalDefault} />

        </div>
      </section>

      {/* === SECTION 2: QUOTE OF THE DAY === */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Quote className="w-10 h-10 text-primary/20 mx-auto mb-4" />
          <p className="text-xl md:text-2xl font-serif italic text-slate-700 leading-relaxed">
            "Hanyalah yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan hari kemudian, serta tetap mendirikan shalat..."
          </p>
          <p className="mt-4 text-sm font-bold text-primary tracking-wide uppercase">
            — Q.S. At-Taubah: 18
          </p>
        </div>
      </section>

      {/* === SECTION 3: SEKILAS TENTANG KAMI === */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Gambar */}
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src="/foto-masjid-1.png" 
                alt="Masjid Exterior" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            </div>

            {/* Teks Deskripsi */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Rumah Ibadah yang Nyaman & Modern</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Sejak berdiri tahun 1998, Masjid Al-Ikhlas terus berbenah. Kini hadir dengan fasilitas ruang sholat ber-AC, area wudhu bersih, perpustakaan mini, dan akses ramah difabel.
              </p>
              <ul className="space-y-3">
                {['Parkir Luas & Aman', 'Kajian Rutin Mingguan', 'TPA Berbasis Multimedia'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                     <div className="h-2 w-2 rounded-full bg-primary"></div>
                     {item}
                   </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-4">
                <Link href="/profil">
                  Baca Profil Lengkap <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 4: KEGIATAN PILIHAN === */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Agenda Terdekat</h2>
              <p className="text-slate-500 mt-2">Jangan lewatkan kegiatan bermanfaat minggu ini.</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex text-primary">
              <Link href="/kegiatan">Lihat Semua <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promoKegiatan.map((item, idx) => (
              <Card key={idx} className="group overflow-hidden border-slate-100 hover:shadow-lg transition-all cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                   <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   <Badge className="absolute top-3 right-3 bg-white/90 text-primary hover:bg-white shadow-sm">
                     {item.category}
                   </Badge>
                </div>
                <CardContent className="p-5 space-y-3">
                   <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <Calendar className="h-3.5 w-3.5" /> {item.date}
                   </div>
                   <h3 className="font-bold text-lg text-slate-800 leading-snug group-hover:text-primary transition-colors">
                     {item.title}
                   </h3>
                   <div className="pt-2 flex items-center text-sm text-primary font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Selengkapnya <ChevronRight className="h-3 w-3 ml-1" />
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <Button variant="outline" asChild className="w-full">
               <Link href="/kegiatan">Lihat Semua Agenda</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* === SECTION 5: CTA DONASI (Banner) === */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
           <Badge variant="outline" className="mb-4 text-white border-white/20 bg-white/5 backdrop-blur-sm">
             Ladang Amal
           </Badge>
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
             Mari Sisihkan Harta untuk Bekal Akhirat
           </h2>
           <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
             Dukungan Anda sangat berarti untuk operasional masjid dan program santunan sosial yang kami jalankan setiap bulannya.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-lg shadow-primary/25">
               <Heart className="mr-2 h-5 w-5 fill-current" /> Infaq Sekarang
             </Button>
             <Button variant="outline" size="lg" className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
               Laporan Keuangan
             </Button>
           </div>
        </div>
      </section>

    </div>
  );
}