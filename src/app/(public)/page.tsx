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
    <div className="flex flex-col min-h-screen font-optimized">
      
      {/* === HERO SECTION === */}
      <section className="relative py-20 lg:py-32 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
           <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-primary blur-3xl"></div>
           <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] rounded-full bg-blue-300 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="px-5 py-2 text-sm font-bold border-primary text-primary bg-primary/5">
              أهلا وسهلا
            </Badge>
            
            <h1 className="display-lg">
              Masjid Al-Ikhlas
            </h1>
            
            <p className="lead text-balance max-w-2xl">
              Menjadi pusat peradaban yang memakmurkan bumi dan menyejukkan hati umat. Mari melangkah bersama menuju ridho-Nya.
            </p>

            <PrayerTimesWidget initialData={jadwalDefault} />
          </div>
        </div>
      </section>

      {/* === QUOTE SECTION === */}
      <section className="py-20 lg:py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <Quote className="w-12 h-12 text-primary/20 mx-auto" />
            <blockquote className="text-balance">
              "Hanyalah yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan hari kemudian..."
            </blockquote>
            <cite className="not-italic block label-primary">
              — Q.S. At-Taubah: 18
            </cite>
          </div>
        </div>
      </section>

      {/* === TENTANG KAMI SECTION === */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src="/foto-masjid-1.png" 
                alt="Masjid Exterior" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-balance">
                Rumah Ibadah yang Nyaman & Modern
              </h2>
              <p className="text-balance">
                Sejak berdiri tahun 1998, Masjid Al-Ikhlas terus berbenah. Kini hadir dengan fasilitas ruang sholat ber-AC, area wudhu bersih, perpustakaan mini, dan akses ramah difabel.
              </p>
              <ul className="space-y-4 mt-6">
                {['Parkir Luas & Aman', 'Kajian Rutin Mingguan', 'TPA Berbasis Multimedia'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 font-sans text-base font-semibold text-slate-700">
                     <div className="h-2 w-2 rounded-full bg-primary shrink-0"></div>
                     {item}
                   </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-6 btn-text">
                <Link href="/profil">
                  Baca Profil Lengkap <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === KEGIATAN SECTION === */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="section-header">
                Agenda Terdekat
              </h2>
              <p className="section-description">
                Jangan lewatkan kegiatan bermanfaat minggu ini untuk menyuburkan iman.
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex text-primary hover:text-primary/80 hover:bg-primary/5 btn-text">
              <Link href="/kegiatan">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promoKegiatan.map((item, idx) => (
              <Card key={idx} className="group overflow-hidden border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                   <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   <Badge className="absolute top-4 right-4 bg-white/95 text-slate-900 hover:bg-white shadow-sm backdrop-blur-sm font-bold text-xs">
                     {item.category}
                   </Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                   <div className="flex items-center gap-2 text-sm text-primary font-bold">
                      <Calendar className="h-4 w-4" /> {item.date}
                   </div>
                   <h3 className="card-title group-hover:text-primary transition-colors">
                     {item.title}
                   </h3>
                   <div className="pt-2 flex items-center text-sm text-slate-500 group-hover:text-primary transition-colors font-bold">
                      Detail Kegiatan <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <Button variant="outline" asChild className="w-full btn-text">
               <Link href="/kegiatan">Lihat Semua Agenda</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* === CTA DONASI === */}
      <section className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <Badge variant="outline" className="text-white border-white/20 bg-white/5 backdrop-blur-sm px-5 py-2 font-bold text-sm">
              Ladang Amal
            </Badge>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
              Mari Sisihkan Harta untuk Bekal Akhirat
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto text-balance">
              Dukungan Anda sangat berarti untuk operasional masjid dan program santunan sosial yang kami jalankan setiap bulannya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white btn-text px-8 h-12 shadow-lg shadow-primary/25">
                <Heart className="mr-2 h-5 w-5 fill-current" /> Infaq Sekarang
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}