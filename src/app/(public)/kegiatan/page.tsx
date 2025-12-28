import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { AGENDA_KEGIATAN } from "@/lib/data-kegiatan";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Agenda Kegiatan",
  description: "Informasi kajian rutin, kegiatan sosial, dan pendidikan TPA.",
};

export default function KegiatanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 via-white to-accent/20 pb-20 font-optimized relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-br from-white via-accent/5 to-secondary/10 border-b border-border/60 py-16 md:py-20 relative">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '25px 25px' }}></div>
        
        <div className="container mx-auto px-4 text-center space-y-4 relative z-10">
          <FadeIn>
            <h1 className="mb-4">Agenda & Kegiatan</h1>
            <p className="lead max-w-2xl mx-auto">
              Temukan jadwal kajian, kegiatan sosial, dan program pendidikan untuk memakmurkan hari-hari Anda.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 relative z-10">
        <Tabs defaultValue="semua" className="w-full">
          <FadeIn delay={0.2}>
            <div className="flex justify-center mb-10">
              <TabsList className="grid w-full max-w-[400px] grid-cols-3 h-auto p-1 bg-white/80 backdrop-blur-sm border border-border shadow-sm rounded-lg">
                <TabsTrigger value="semua" className="py-2.5 font-sans font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">Semua</TabsTrigger>
                <TabsTrigger value="kajian" className="py-2.5 font-sans font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">Kajian</TabsTrigger>
                <TabsTrigger value="sosial" className="py-2.5 font-sans font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">Sosial</TabsTrigger>
              </TabsList>
            </div>
          </FadeIn>

          {/* Helper Function untuk Render Grid dengan Animasi */}
          <TabsContent value="semua" className="mt-0">
             <KegiatanGrid data={AGENDA_KEGIATAN} />
          </TabsContent>
          
          <TabsContent value="kajian" className="mt-0">
             <KegiatanGrid data={AGENDA_KEGIATAN.filter(k => k.category === 'Kajian')} />
          </TabsContent>

          <TabsContent value="sosial" className="mt-0">
             <KegiatanGrid data={AGENDA_KEGIATAN.filter(k => k.category === 'Sosial')} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Komponen Grid Terpisah agar kode rapi
function KegiatanGrid({ data }: { data: typeof AGENDA_KEGIATAN }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((item, i) => (
        <FadeIn key={i} delay={i * 0.1}>
          <KegiatanCard data={item} />
        </FadeIn>
      ))}
    </div>
  );
}

// Komponen Kartu
function KegiatanCard({ data }: { data: any }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-border overflow-hidden flex flex-col h-full bg-white/95 backdrop-blur-sm">
      <div className="h-52 bg-gradient-to-br from-secondary/20 to-accent/10 relative overflow-hidden">
        {/* Placeholder warna/gambar */}
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
           <span className="text-small font-medium">Masjid Jami' Al-Huda</span>
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