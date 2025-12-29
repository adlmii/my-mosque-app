import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, History, Target } from "lucide-react";
import { MosqueMap } from "@/components/features/contact/MosqueMap";
import { MASJID_INFO, SEJARAH_MASJID, VISI_MISI, STRUKTUR_DKM } from "@/lib/data-masjid";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Profil & Sejarah",
  description: "Mengenal sejarah, visi misi, dan struktur pengurus masjid.",
};

export default function ProfilPage() {
  return (
    <div className="flex flex-col font-optimized pb-20 relative overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/30 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header Halaman */}
      <section className="bg-gradient-to-br from-secondary/10 via-white to-accent/20 py-16 md:py-24 border-b border-border/60 relative">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <FadeIn>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 bg-white/80 backdrop-blur-sm text-primary">
              Tentang Kami
            </Badge>
            <h1 className="mb-6 leading-tight">
              Mengenal Sejarah
              <span className="block mt-2 text-primary">
                {MASJID_INFO.nama}
              </span>
            </h1>
            <p className="lead text-balance">
              Lebih dari sekadar tempat sujud, kami adalah rumah bagi komunitas muslim untuk tumbuh, belajar, dan berbagi kebaikan.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sejarah Singkat */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/10 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <FadeIn delay={0.2} className="order-2 md:order-1 space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <History className="w-6 h-6" />
                <span className="label-primary text-base">Perjalanan Kami</span>
              </div>
              <h2 className="mb-4">Sejarah Singkat</h2>
              {SEJARAH_MASJID.deskripsi.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </FadeIn>

            <FadeIn delay={0.4} className="order-1 md:order-2 h-[300px] md:h-[400px] bg-gradient-to-br from-secondary/20 to-accent/10 rounded-2xl overflow-hidden border border-border shadow-lg">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground font-sans font-medium">
                Foto Sejarah Masjid
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 via-accent/5 to-white relative">
        <div className="container mx-auto px-4 relative z-10">
            <FadeIn>
              <div className="text-center mb-12 space-y-4">
                 <div className="inline-flex items-center gap-2 text-primary">
                   <Target className="w-6 h-6" />
                   <span className="label-primary text-base">Arah Perjuangan</span>
                 </div>
                 <h2 className="section-header">Visi & Misi</h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <FadeIn delay={0.2} className="h-full">
                <Card className="bg-gradient-to-br from-primary via-primary to-emerald-900 text-primary-foreground border-none shadow-xl h-full relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
                  
                  <CardContent className="p-8 md:p-10 text-center space-y-6 flex flex-col justify-center h-full relative z-10">
                    <h3 className="text-white font-serif text-3xl font-bold">Visi</h3>
                    <p className="text-lg md:text-xl leading-relaxed text-white/90 font-medium font-serif italic">
                      "{VISI_MISI.visi}"
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.3} className="h-full">
                <Card className="border-border shadow-sm bg-white/95 backdrop-blur-sm h-full">
                  <CardContent className="p-8 md:p-10 space-y-6">
                    <h3 className="text-3xl font-bold font-serif text-foreground text-center">Misi</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      {VISI_MISI.misi.map((misi, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-secondary to-accent/50 text-primary font-bold text-sm font-sans">{i+1}</span>
                          <span className="text-base leading-relaxed">{misi}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/10 relative">
        <div className="container mx-auto px-4 text-center relative z-10">
           <FadeIn>
             <div className="inline-flex items-center gap-2 text-primary mb-4">
               <Users className="w-6 h-6" />
               <span className="label-primary text-base">Khadimul Ummah</span>
             </div>
             <h2 className="section-header mb-12">Struktur Pengurus DKM</h2>
           </FadeIn>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {STRUKTUR_DKM.map((item, i) => (
               <FadeIn key={i} delay={i * 0.1}>
                 <div className="group">
                   <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-gradient-to-br from-secondary/30 to-accent/20 rounded-full mb-6 overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300 border border-border/30">
                     <div className="w-full h-full bg-secondary/20"></div>
                   </div>
                   <h5 className="mb-1 text-foreground">{item.nama}</h5>
                   <p className="label text-primary">{item.role}</p>
                 </div>
               </FadeIn>
             ))}
           </div>
        </div>
      </section>

      <FadeIn delay={0.2}>
        <MosqueMap />
      </FadeIn>
    </div>
  );
}