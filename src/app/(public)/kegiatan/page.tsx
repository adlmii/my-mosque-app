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
    <div className="min-h-screen bg-secondary/10 pb-20 font-optimized">
      
      {/* Header */}
      <div className="bg-white border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="mb-4">Agenda & Kegiatan</h1>
          <p className="lead max-w-2xl mx-auto">
            Temukan jadwal kajian, kegiatan sosial, dan program pendidikan untuk memakmurkan hari-hari Anda.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <Tabs defaultValue="semua" className="w-full">
          <div className="flex justify-center mb-10">
            {/* Ubah Background Tabs List */}
            <TabsList className="grid w-full max-w-[400px] grid-cols-3 h-auto p-1 bg-white border border-border shadow-sm rounded-lg">
              <TabsTrigger value="semua" className="py-2.5 font-sans font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">Semua</TabsTrigger>
              <TabsTrigger value="kajian" className="py-2.5 font-sans font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">Kajian</TabsTrigger>
              <TabsTrigger value="sosial" className="py-2.5 font-sans font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">Sosial</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="semua" className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {semuaKegiatan.map((item, i) => (
                  <KegiatanCard key={i} data={item} />
                ))}
             </div>
          </TabsContent>
          
          <TabsContent value="kajian" className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {semuaKegiatan.filter(k => k.category === 'Kajian').map((item, i) => (
                   <KegiatanCard key={i} data={item} />
                ))}
             </div>
          </TabsContent>

          <TabsContent value="sosial" className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
    <Card className="group hover:shadow-xl transition-all duration-300 border-border overflow-hidden flex flex-col h-full bg-white">
      <div className="h-52 bg-secondary/30 relative overflow-hidden">
        <div className="w-full h-full bg-secondary/20 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/95 text-foreground hover:bg-white backdrop-blur-sm shadow-sm font-bold tracking-wide">
             {data.category}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-6 pb-3">
        <h3 className="card-title line-clamp-2 group-hover:text-primary transition-colors">
          {data.title}
        </h3>
      </CardHeader>
      <CardContent className="p-6 pt-2 space-y-3 flex-1">
        <div className="flex items-center gap-3 text-muted-foreground">
           <Calendar className="w-4 h-4 text-primary shrink-0" /> 
           <span className="text-small font-medium">{data.date}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
           <MapPin className="w-4 h-4 text-primary shrink-0" /> 
           <span className="text-small font-medium">Masjid Al-Ikhlas</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
           <Clock className="w-4 h-4 text-primary shrink-0" /> 
           <span className="text-small font-medium">{data.ustadz}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="outline" className="w-full btn-text border-border group-hover:border-primary group-hover:text-primary transition-colors hover:bg-secondary/20">
            Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  )
}