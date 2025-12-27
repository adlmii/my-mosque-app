import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Landmark, Users, MapPin, Target, History, Sparkles } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="flex flex-col w-full">
      
      {/* === HEADER SECTION === */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center space-y-4">
          <Badge variant="secondary" className="mb-2">Profil Kami</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Mengenal Masjid Al-Ikhlas
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Lebih dari sekadar tempat ibadah. Kami adalah pusat peradaban, pendidikan, 
            dan kedamaian bagi umat di tengah hiruk pikuk kota.
          </p>
        </div>
      </section>

      {/* === SECTION 1: SEJARAH (Gaya Referensi Gambar 3) === */}
      {/* Layout: Gambar Kiri, Timeline Kanan */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* KIRI: Gambar Besar */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/foto-masjid-2.png" 
                alt="Sejarah Masjid" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-medium text-lg">
                  "Dari musholla kecil hingga menjadi landmark umat."
                </p>
              </div>
            </div>

            {/* KANAN: Timeline / Sejarah */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <History className="h-5 w-5" />
                  <span>Perjalanan Kami</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Jejak Langkah Bersejarah</h2>
                <p className="text-slate-500">
                  Setiap batu bata masjid ini menjadi saksi perjuangan para pendiri dan jamaah dalam membangun rumah Allah.
                </p>
              </div>

              {/* Timeline Items */}
              <div className="space-y-6">
                {/* Item 1 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <div className="w-0.5 h-full bg-slate-200 mt-1"></div>
                  </div>
                  <div className="pb-6">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded mb-2 inline-block">1998</span>
                    <h3 className="text-xl font-bold text-slate-800">Awal Pendirian</h3>
                    <p className="text-slate-500 mt-1 leading-relaxed">
                      Didirikan di atas tanah wakaf Bapak H. Fulan (Alm) berukuran 6x6 meter sebagai musholla sederhana untuk warga sekitar.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <div className="w-0.5 h-full bg-slate-200 mt-1"></div>
                  </div>
                  <div className="pb-6">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded mb-2 inline-block">2010</span>
                    <h3 className="text-xl font-bold text-slate-800">Renovasi Besar</h3>
                    <p className="text-slate-500 mt-1 leading-relaxed">
                      Perluasan bangunan utama menjadi 2 lantai dengan arsitektur modern minimalis untuk menampung 500 jamaah.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                  </div>
                  <div>
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded mb-2 inline-block">2024</span>
                    <h3 className="text-xl font-bold text-slate-800">Pusat Digital</h3>
                    <p className="text-slate-500 mt-1 leading-relaxed">
                      Transformasi manajemen digital dan peluncuran website resmi untuk menjangkau umat lebih luas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === SECTION 2: VISI & MISI (Gaya Referensi Gambar 2) === */}
      {/* Layout: Teks Kiri, Gambar Kanan (Zig-zag) */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* KIRI: Konten Visi Misi */}
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-primary font-bold">
                  <Target className="h-5 w-5" />
                  <span>Arah Gerak</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Visi & Misi Kami</h2>
              </div>

              {/* Card Visi */}
              <Card className="bg-primary text-primary-foreground border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> Visi Utama
                  </h3>
                  <p className="text-lg italic font-medium leading-relaxed opacity-90">
                    "Terwujudnya Masjid Al-Ikhlas sebagai pusat peradaban umat yang makmur, mencerahkan, dan menyejukkan hati."
                  </p>
                </CardContent>
              </Card>

              {/* List Misi (Style Kotak Putih seperti referensi) */}
              <div className="space-y-4">
                {[
                  "Menyelenggarakan peribadatan yang khusyuk dan tertib sesuai sunnah.",
                  "Mengembangkan pendidikan Al-Quran bagi generasi muda.",
                  "Membangun kemandirian ekonomi masjid melalui unit usaha umat.",
                  "Menjadi pusat penyaluran ZISWAF yang amanah dan transparan."
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 items-start hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary font-bold rounded-full flex items-center justify-center text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* KANAN: Gambar Tinggi */}
            <div className="order-1 lg:order-2 relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl lg:-mt-12">
               <img 
                src="https://images.unsplash.com/photo-1542043644-b033621516e5?q=80&w=1000&auto=format&fit=crop" 
                alt="Menara Masjid" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* === SECTION 3: STRUKTUR DKM === */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <Users className="h-8 w-8 text-primary" /> Pengurus DKM
            </h2>
            <p className="text-slate-500 mt-2">Mereka yang berkhidmat melayani kebutuhan umat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Card Pengurus 1 */}
             <div className="group bg-slate-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-xl transition-all border border-slate-100">
                <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Foto" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-slate-900">H. Ahmad Dahlan</h3>
                <p className="text-primary text-sm font-medium">Ketua DKM</p>
             </div>

             {/* Card Pengurus 2 */}
             <div className="group bg-slate-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-xl transition-all border border-slate-100">
                <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=13" alt="Foto" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-slate-900">Budi Santoso</h3>
                <p className="text-primary text-sm font-medium">Sekretaris</p>
             </div>

             {/* Card Pengurus 3 */}
             <div className="group bg-slate-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-xl transition-all border border-slate-100">
                <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden">
                   <img src="https://i.pravatar.cc/150?img=5" alt="Foto" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-slate-900">Siti Aminah</h3>
                <p className="text-primary text-sm font-medium">Bendahara</p>
             </div>

             {/* Card Pengurus 4 */}
             <div className="group bg-slate-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-xl transition-all border border-slate-100">
                <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=60" alt="Foto" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-slate-900">Joko Susilo</h3>
                <p className="text-primary text-sm font-medium">Rumah Tangga</p>
             </div>
          </div>
        </div>
      </section>

      {/* === SECTION 4: LOKASI (Tetap Dipertahankan) === */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <MapPin className="h-8 w-8 text-primary" /> Lokasi Kami
            </h2>
          </div>
          
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100">
            <div className="relative w-full h-[400px] bg-slate-100 rounded-xl overflow-hidden">
              <iframe 
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Jl.%20Daan%20Mogot%20No.14%2C%20RT.005%2FRW.002%2C%20Batuceper%2C%20Kec.%20Batuceper%2C%20Kota%20Tangerang%2C%20Banten%2015122&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-6 text-center md:text-left md:flex justify-between items-center">
              <div>
                 <p className="font-bold text-lg text-slate-900">Masjid Al-Ikhlas</p>
                 <p className="text-slate-500">Jl. Kebaikan No. 99, Jakarta Selatan</p>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                className="inline-block mt-4 md:mt-0 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Buka Peta →
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}