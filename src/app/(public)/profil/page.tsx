import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, History, Target } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="flex flex-col min-h-screen font-optimized">
      
      {/* Header Halaman */}
      <section className="bg-secondary/10 py-16 md:py-24 border-b border-border/60">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 bg-primary/5 text-primary">
            Tentang Kami
          </Badge>
          <h1 className="mb-6">
            Mengenal Masjid Al-Ikhlas
          </h1>
          <p className="lead text-balance">
            Lebih dari sekadar tempat sujud, kami adalah rumah bagi komunitas muslim untuk tumbuh, belajar, dan berbagi kebaikan.
          </p>
        </div>
      </section>

      {/* Sejarah Singkat */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <History className="w-6 h-6" />
                <span className="label-primary text-base">Perjalanan Kami</span>
              </div>
              <h2 className="mb-4">Sejarah Singkat</h2>
              <p>
                Didirikan pada tahun 1998 di atas tanah wakaf seluas 2.000m², Masjid Al-Ikhlas berawal dari sebuah musholla sederhana. Atas gotong royong warga, renovasi besar dilakukan pada tahun 2010.
              </p>
              <p>
                Kini, masjid ini mampu menampung hingga 1.500 jamaah dan menjadi pusat kegiatan keagamaan serta sosial bagi warga sekitar.
              </p>
            </div>
            <div className="order-1 md:order-2 h-[300px] md:h-[400px] bg-secondary/20 rounded-2xl overflow-hidden border border-border shadow-lg">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground font-sans font-medium">
                Foto Sejarah Masjid
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
               <div className="inline-flex items-center gap-2 text-primary">
                 <Target className="w-6 h-6" />
                 <span className="label-primary text-base">Arah Perjuangan</span>
               </div>
               <h2 className="section-header">Visi & Misi</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Kartu Visi */}
              <Card className="bg-primary text-primary-foreground border-none shadow-xl">
                <CardContent className="p-8 md:p-10 text-center space-y-6 flex flex-col justify-center h-full">
                  <h3 className="text-white font-serif text-3xl font-bold">Visi</h3>
                  <p className="text-lg md:text-xl leading-relaxed text-white/90 font-medium font-serif italic">
                    "Menjadi pusat peradaban Islam yang mandiri, modern, dan rahmatan lil 'alamin bagi masyarakat sekitar."
                  </p>
                </CardContent>
              </Card>

              {/* Kartu Misi */}
              <Card className="border-border shadow-sm bg-white">
                <CardContent className="p-8 md:p-10 space-y-6">
                  <h3 className="text-3xl font-bold font-serif text-foreground text-center">Misi</h3>
                  <ul className="space-y-4 text-muted-foreground">
                    {[
                      "Menyediakan layanan ibadah yang nyaman dan khusyuk.",
                      "Menyelenggarakan pendidikan Islam untuk segala usia.",
                      "Memberdayakan ekonomi umat melalui Baitul Mal.",
                      "Mempererat ukhuwah islamiyah antar warga."
                    ].map((misi, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-primary font-bold text-sm font-sans">{i+1}</span>
                        <span className="text-base leading-relaxed">{misi}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
           <div className="inline-flex items-center gap-2 text-primary mb-4">
             <Users className="w-6 h-6" />
             <span className="label-primary text-base">Khadimul Ummah</span>
           </div>
           <h2 className="section-header mb-12">Struktur Pengurus DKM</h2>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {['Ketua DKM', 'Sekretaris', 'Bendahara', 'Kabid Ibadah'].map((role, i) => (
               <div key={i} className="group">
                 <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-secondary/30 rounded-full mb-6 overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300">
                   <div className="w-full h-full bg-secondary/20"></div>
                 </div>
                 <h5 className="mb-1 text-foreground">H. Fulan bin Fulan</h5>
                 <p className="label text-primary">{role}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

    </div>
  );
}