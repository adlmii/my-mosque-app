import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPrayerTimes } from "@/services/prayer-api";
import { PrayerTimesWidget } from "@/components/features/prayer-times/PrayerTimesWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Quote, ChevronRight, Heart } from "lucide-react";
import { MASJID_INFO } from "@/lib/data-masjid";
import { KEGIATAN_MASJID } from "@/lib/data-kegiatan"; 
import { FadeIn } from "@/components/ui/fade-in"; 

export default async function HomePage() {
  const jadwalDefault = await getPrayerTimes();
  
  return (
    <div className="flex flex-col min-h-screen font-optimized overflow-x-hidden">
      
      {/* === HERO SECTION === */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-secondary via-white to-accent overflow-hidden">
        {/* Background Blur Decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
           <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse"></div>
           <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] rounded-full bg-secondary blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto mb-16">
            <FadeIn delay={0.1}>
              <Badge variant="outline" className="px-5 py-2 text-sm font-bold border-primary/20 text-primary bg-white/80 backdrop-blur-sm shadow-sm">
                أهلا وسهلا
              </Badge>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h1 className="display-lg">
                {MASJID_INFO.nama}
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="lead text-balance max-w-2xl">
                Menjadi pusat peradaban yang memakmurkan bumi dan menyejukkan hati umat. Mari melangkah bersama menuju ridho-Nya.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.5}>
             <PrayerTimesWidget initialData={jadwalDefault} />
          </FadeIn>

        </div>
      </section>

      {/* === QUOTE SECTION === */}
      <section className="py-20 lg:py-24 bg-white border-y border-border/60 relative overflow-hidden">
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <Quote className="w-12 h-12 text-primary/20 mx-auto" />
              <blockquote className="text-balance text-foreground text-xl md:text-2xl font-serif italic">
                "Hanyalah yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan hari kemudian..."
              </blockquote>
              <cite className="not-italic block label-primary">
                — Q.S. At-Taubah: 18
              </cite>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* === TENTANG KAMI SECTION === */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-accent/30 to-secondary/20 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <FadeIn delay={0.2} className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group border border-border/50 bg-white">
              <img 
                src="/foto-masjid-1.png" 
                alt="Masjid Exterior" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={0.4}>
                <h2 className="text-balance text-foreground section-header">
                  Rumah Ibadah yang Nyaman & Modern
                </h2>
                <p className="text-balance text-muted-foreground mt-4">
                  Sejak berdiri tahun 1998, {MASJID_INFO.nama} terus berbenah. Kini hadir dengan fasilitas ruang sholat ber-AC, area wudhu bersih, perpustakaan mini, dan akses ramah difabel.
                </p>
                <ul className="space-y-4 mt-6">
                  {['Parkir Luas & Aman', 'Kajian Rutin Mingguan', 'TPA Berbasis Multimedia'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-sans text-base font-semibold text-foreground/80">
                      <div className="h-2 w-2 rounded-full bg-primary shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="mt-8 btn-text border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Link href="/profil">
                    Baca Profil Lengkap <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* === KEGIATAN SECTION === */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
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
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {KEGIATAN_MASJID.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <Card className="group overflow-hidden border-border/60 hover:shadow-xl transition-all duration-300 h-full bg-white">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 right-4 bg-white/95 text-foreground hover:bg-white shadow-sm backdrop-blur-sm font-bold text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-primary font-bold">
                        <Calendar className="h-4 w-4" /> {item.date}
                    </div>
                    <h3 className="card-title group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="pt-2 flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors font-bold">
                        Detail Kegiatan <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
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
      <section className="py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-emerald-900 relative overflow-hidden text-center">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto space-y-8">
              <Badge variant="outline" className="text-white border-white/20 bg-white/10 backdrop-blur-sm px-5 py-2 font-bold text-sm">
                Ladang Amal
              </Badge>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
                Mari Sisihkan Harta untuk Bekal Akhirat
              </h2>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto text-balance">
                Dukungan Anda sangat berarti untuk operasional {MASJID_INFO.nama} dan program santunan sosial yang kami jalankan setiap bulannya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 btn-text px-8 h-12 shadow-lg scale-100 hover:scale-105 transition-transform duration-300">
                  <Heart className="mr-2 h-5 w-5 fill-current" /> Infaq Sekarang
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}