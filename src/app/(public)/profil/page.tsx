import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, History, Target } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header Halaman */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/5">
            Tentang Kami
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Mengenal Masjid Al-Ikhlas
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Lebih dari sekadar tempat sujud, kami adalah rumah bagi komunitas muslim untuk tumbuh, belajar, dan berbagi kebaikan.
          </p>
        </div>
      </section>

      {/* Sejarah Singkat */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <div className="flex items-center gap-3 text-primary font-bold text-xl">
                <History className="w-6 h-6" />
                <h2>Sejarah Singkat</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                Didirikan pada tahun 1998 di atas tanah wakaf seluas 2.000m², Masjid Al-Ikhlas berawal dari sebuah musholla sederhana. Atas gotong royong warga, renovasi besar dilakukan pada tahun 2010.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Kini, masjid ini mampu menampung hingga 1.500 jamaah dan menjadi pusat kegiatan keagamaan serta sosial bagi warga sekitar.
              </p>
            </div>
            <div className="order-1 md:order-2 h-[300px] md:h-[400px] bg-slate-200 rounded-2xl overflow-hidden">
              {/* Ganti dengan foto sejarah masjid */}
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                Foto Sejarah Masjid
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <div className="inline-flex items-center gap-2 text-primary font-bold text-xl mb-2">
                 <Target className="w-6 h-6" />
                 <h2>Arah Perjuangan</h2>
               </div>
               <h3 className="font-serif text-3xl font-bold text-slate-900">Visi & Misi</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Kartu Visi */}
              <Card className="bg-primary text-primary-foreground border-none shadow-xl">
                <CardContent className="p-8 text-center space-y-4">
                  <h4 className="text-2xl font-bold font-serif">Visi</h4>
                  <p className="text-lg leading-relaxed opacity-90">
                    "Menjadi pusat peradaban Islam yang mandiri, modern, dan rahmatan lil 'alamin bagi masyarakat sekitar."
                  </p>
                </CardContent>
              </Card>

              {/* Kartu Misi */}
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-8 space-y-4">
                  <h4 className="text-2xl font-bold font-serif text-slate-900 text-center">Misi</h4>
                  <ul className="space-y-3 text-slate-600">
                    {[
                      "Menyediakan layanan ibadah yang nyaman dan khusyuk.",
                      "Menyelenggarakan pendidikan Islam untuk segala usia.",
                      "Memberdayakan ekonomi umat melalui Baitul Mal.",
                      "Mempererat ukhuwah islamiyah antar warga."
                    ].map((misi, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="font-bold text-primary">{i+1}.</span>
                        {misi}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
        </div>
      </section>

      {/* Struktur Organisasi (Opsional) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
           <div className="inline-flex items-center gap-2 text-primary font-bold text-xl mb-4">
             <Users className="w-6 h-6" />
             <h2>Khadimul Ummah</h2>
           </div>
           <h3 className="font-serif text-3xl font-bold text-slate-900 mb-12">Struktur Pengurus DKM</h3>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {['Ketua DKM', 'Sekretaris', 'Bendahara', 'Kabid Ibadah'].map((role, i) => (
               <div key={i} className="group">
                 <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                   {/* Placeholder Foto */}
                   <div className="w-full h-full bg-slate-200"></div>
                 </div>
                 <h4 className="font-bold text-lg text-slate-900">H. Fulan bin Fulan</h4>
                 <p className="text-slate-500 text-sm">{role}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

    </div>
  );
}