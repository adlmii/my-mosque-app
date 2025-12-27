import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function KegiatanPage() {
  const semuaKegiatan = [
    { title: "Kajian Tafsir Jalalain", category: "Kajian", date: "Senin, 20:00 WIB", ustadz: "Ust. Abdullah" },
    { title: "Santunan Yatim Piatu", category: "Sosial", date: "Jumat, 13:00 WIB", ustadz: "Panitia Sosial" },
    { title: "Tahsin Anak & Remaja", category: "Pendidikan", date: "Selasa, 16:00 WIB", ustadz: "Tim Pengajar" },
    { title: "Subuh Keliling (Subling)", category: "Kajian", date: "Ahad, 04:30 WIB", ustadz: "Ust. Tamu" },
    { title: "Cek Kesehatan Gratis", category: "Sosial", date: "Sabtu, 08:00 WIB", ustadz: "Tim Medis" },
    { title: "Pesantren Kilat Liburan", category: "Pendidikan", date: "20-25 Des 2024", ustadz: "Tim DKM" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">Agenda & Kegiatan</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Temukan jadwal kajian, kegiatan sosial, dan program pendidikan untuk memakmurkan hari-hari Anda.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <Tabs defaultValue="semua" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-[400px] grid-cols-3">
              <TabsTrigger value="semua">Semua</TabsTrigger>
              <TabsTrigger value="kajian">Kajian</TabsTrigger>
              <TabsTrigger value="sosial">Sosial</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="semua" className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {semuaKegiatan.map((item, i) => (
                  <KegiatanCard key={i} data={item} />
                ))}
             </div>
          </TabsContent>
          
          {/* Contoh Filter Sederhana (Di real app pakai filter logic) */}
          <TabsContent value="kajian" className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {semuaKegiatan.filter(k => k.category === 'Kajian').map((item, i) => (
                   <KegiatanCard key={i} data={item} />
                ))}
             </div>
          </TabsContent>

          <TabsContent value="sosial" className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {semuaKegiatan.filter(k => k.category === 'Sosial').map((item, i) => (
                   <KegiatanCard key={i} data={item} />
                ))}
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Komponen Kecil untuk Kartu
function KegiatanCard({ data }: { data: any }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="h-48 bg-slate-200 relative">
        {/* Placeholder Gambar */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm">
             {data.category}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-5 pb-2">
        <h3 className="font-serif text-xl font-bold text-slate-900 leading-snug line-clamp-2">
          {data.title}
        </h3>
      </CardHeader>
      <CardContent className="p-5 pt-2 space-y-3 flex-1">
        <div className="flex items-center gap-2 text-sm text-slate-600">
           <Calendar className="w-4 h-4 text-primary" /> 
           <span>{data.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
           <MapPin className="w-4 h-4 text-primary" /> 
           <span>Masjid Al-Ikhlas</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
           <Clock className="w-4 h-4 text-primary" /> 
           <span>{data.ustadz}</span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button variant="outline" className="w-full">Detail</Button>
      </CardFooter>
    </Card>
  )
}