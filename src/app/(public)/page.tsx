import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPrayerTimes } from "@/services/prayer-api";
import { PrayerTimesWidget } from "@/components/features/prayer-times/PrayerTimesWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Quote, ChevronRight, Heart } from "lucide-react";

export default async function HomePage() {
  const jadwalDefault = await getPrayerTimes();

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
      
      {/* === HERO SECTION === */}
      <section className="relative py-20 lg:py-32 bg-slate-50 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
           <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-primary blur-3xl"></div>
           <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] rounded-full bg-blue-300 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center space-y-8 text-center">
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary text-primary bg-primary/5">
            Ahlan Wa Sahlan
          </Badge>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-slate-900">
            Masjid Al-Ikhlas
          </h1>
          
          <p className="max-w-2xl text-xl text-slate-600 leading-relaxed">
            Menjadi pusat peradaban yang memakmurkan bumi dan menyejukkan hati umat. Mari melangkah bersama menuju ridho-Nya.
          </p>

          <PrayerTimesWidget initialData={jadwalDefault} />
        </div>
      </section>

      {/* === QUOTE SECTION === */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />
          <blockquote className="text-2xl md:text-4xl font-serif text-slate-900 leading-snug">
            "Hanyalah yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan hari kemudian..."
          </blockquote>
          <div className="mt-6 font-bold text-primary tracking-wide uppercase text-sm">
            — Q.S. At-Taubah: 18
          </div>
        </div>
      </section>

      {/* === TENTANG KAMI SECTION === */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src="/foto-masjid-1.png" 
                alt="Masjid Exterior" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
                Rumah Ibadah yang Nyaman & Modern
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Sejak berdiri tahun 1998, Masjid Al-Ikhlas terus berbenah. Kini hadir dengan fasilitas ruang sholat ber-AC, area wudhu bersih, perpustakaan mini, dan akses ramah difabel.
              </p>
              <ul className="space-y-3 mt-4">
                {['Parkir Luas & Aman', 'Kajian Rutin Mingguan', 'TPA Berbasis Multimedia'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                     <div className="h-2 w-2 rounded-full bg-primary"></div>
                     {item}
                   </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-2">
                <Link href="/profil">
                  Baca Profil Lengkap <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === KEGIATAN SECTION === */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">Agenda Terdekat</h2>
              <p className="text-lg text-slate-600 mt-3">Jangan lewatkan kegiatan bermanfaat minggu ini untuk menyuburkan iman.</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex text-primary hover:text-primary/80 hover:bg-primary/5">
              <Link href="/kegiatan">Lihat Semua <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promoKegiatan.map((item, idx) => (
              <Card key={idx} className="group overflow-hidden border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                   <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900 hover:bg-white shadow-sm backdrop-blur-sm">
                     {item.category}
                   </Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                   <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <Calendar className="h-4 w-4" /> {item.date}
                   </div>
                   <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                     {item.title}
                   </h3>
                   <div className="pt-2 flex items-center text-sm text-slate-500 group-hover:text-primary transition-colors font-medium">
                      Detail Kegiatan <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
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

      {/* === CTA DONASI === */}
      <section className="py-24 bg-slate-900 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
           <Badge variant="outline" className="mb-6 text-white border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1">
             Ladang Amal
           </Badge>
           <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
             Mari Sisihkan Harta untuk Bekal Akhirat
           </h2>
           <p className="text-slate-300 text-lg mb-10 leading-relaxed">
             Dukungan Anda sangat berarti untuk operasional masjid dan program santunan sosial yang kami jalankan setiap bulannya.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12 text-lg shadow-lg shadow-primary/25">
               <Heart className="mr-2 h-5 w-5 fill-current" /> Infaq Sekarang
             </Button>
           </div>
        </div>
      </section>

    </div>
  );
}