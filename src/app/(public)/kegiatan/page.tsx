import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, MapPin, Repeat, Clock } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { db } from "@/db"; 
import { activities } from "@/db/schema";
import { desc } from "drizzle-orm";
import dayjs from "@/lib/dayjs"; 

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agenda Kegiatan",
  description: "Informasi kajian rutin, kegiatan sosial, dan pendidikan TPA.",
};

export default async function KegiatanPage() {
  const activitiesData = await db
    .select()
    .from(activities)
    .orderBy(desc(activities.createdAt));

  const formattedData = activitiesData.map((item) => {
    let dateDisplay = "";
    let isRutin = item.frequency === "rutin";

    if (isRutin) {
      const hari = item.dayOfWeek ? item.dayOfWeek.charAt(0).toUpperCase() + item.dayOfWeek.slice(1) : "-";
      dateDisplay = `Setiap ${hari}, ${item.time}`;
    } else {
      dateDisplay = item.date 
        ? dayjs(item.date).format("dddd, D MMMM YYYY • HH:mm") + " WIB"
        : "Waktu belum ditentukan";
    }

    return {
      ...item,
      formattedDate: dateDisplay,
      isRutin: isRutin
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 via-white to-accent/20 pb-20 font-optimized relative overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-br from-white via-accent/5 to-secondary/10 border-b border-border/60 py-16 md:py-20 relative">
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
              <TabsList className="grid w-full max-w-[500px] grid-cols-2 md:grid-cols-4 h-auto p-1 bg-white/80 backdrop-blur-sm border border-border shadow-sm rounded-lg">
                <TabsTrigger value="semua" className="py-2 font-sans font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">Semua</TabsTrigger>
                <TabsTrigger value="kajian" className="py-2 font-sans font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">Kajian</TabsTrigger>
                <TabsTrigger value="sosial" className="py-2 font-sans font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">Sosial</TabsTrigger>
                <TabsTrigger value="pendidikan" className="py-2 font-sans font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">Pendidikan</TabsTrigger>
              </TabsList>
            </div>
          </FadeIn>

          {/* Render Grid */}
          <TabsContent value="semua" className="mt-0">
             <KegiatanGrid data={formattedData} />
          </TabsContent>
          
          <TabsContent value="kajian" className="mt-0">
             <KegiatanGrid data={formattedData.filter(k => k.category === 'Kajian')} />
          </TabsContent>

          <TabsContent value="sosial" className="mt-0">
             <KegiatanGrid data={formattedData.filter(k => k.category === 'Sosial')} />
          </TabsContent>

          <TabsContent value="pendidikan" className="mt-0">
             <KegiatanGrid data={formattedData.filter(k => k.category === 'Pendidikan')} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Komponen Grid
function KegiatanGrid({ data }: { data: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.length > 0 ? (
        data.map((item, i) => (
          <FadeIn key={item.id} delay={i * 0.1}>
            <KegiatanCard data={item} />
          </FadeIn>
        ))
      ) : (
        <div className="col-span-full text-center py-20 text-muted-foreground bg-white/50 rounded-xl border border-dashed border-border/50">
          <p>Belum ada agenda untuk kategori ini.</p>
        </div>
      )}
    </div>
  );
}

function KegiatanCard({ data }: { data: any }) {
  let dateText = "";
  let timeText = "";

  if (data.isRutin) {
      dateText = `Setiap ${data.dayOfWeek ? data.dayOfWeek.charAt(0).toUpperCase() + data.dayOfWeek.slice(1) : "-"}`;
      const isJam = /^\d{1,2}[:.]\d{2}$/.test(data.time);
      timeText = data.time ? (isJam ? `${data.time} WIB` : data.time) : "";
  } else {
      dateText = data.date ? dayjs(data.date).format("D MMMM YYYY") : "Segera";
      timeText = data.date ? dayjs(data.date).format("HH:mm") + " WIB" : "";
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-border overflow-hidden flex flex-col h-full bg-white/95 backdrop-blur-sm py-0 gap-0"> 
      
      {/* Image Header */}
      <div className="relative w-full h-40 bg-gradient-to-br from-secondary/20 to-accent/10 overflow-hidden shrink-0">
        {data.imageUrl ? (
           <img 
             src={data.imageUrl} 
             alt={data.title} 
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
           />
        ) : (
           <div className="w-full h-full bg-secondary/20 transition-transform duration-700 group-hover:scale-105" />
        )}
        
        {/* Badge Kategori */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          <Badge className="bg-white/90 text-foreground hover:bg-white backdrop-blur-sm shadow-sm font-bold tracking-wide border-0 px-2 py-0.5 text-[10px] uppercase">
             {data.category}
          </Badge>
          {data.isRutin && (
             <Badge variant="secondary" className="bg-blue-500/90 text-white backdrop-blur-sm shadow-sm font-bold tracking-wide border-0 px-2 py-0.5 text-[10px] uppercase">
               Rutin
             </Badge>
          )}
        </div>

        {/* Badge Jam */}
        {timeText && (
            <div className="absolute top-3 right-3 z-10">
                <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-md shadow-sm font-mono font-medium tracking-wide border-0 px-2 py-1 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-white/80" />
                    {timeText}
                </Badge>
            </div>
        )}
      </div>

      <CardHeader className="p-5 pb-2 pt-5"> 
        <h3 className="card-title text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {data.title}
        </h3>
      </CardHeader>
      
      <CardContent className="p-5 pt-2 space-y-2.5 flex-1">
        {/* Tanggal */}
        <div className="flex items-center gap-2.5 text-muted-foreground">
           {data.isRutin ? (
              <Repeat className="w-4 h-4 text-blue-500 shrink-0" /> 
           ) : (
              <Calendar className="w-4 h-4 text-primary shrink-0" /> 
           )}
           <span className={`text-sm font-medium ${data.isRutin ? "text-blue-700" : "text-foreground/80"}`}>
              {dateText}
           </span>
        </div>
        
        {/* Lokasi */}
        <div className="flex items-center gap-2.5 text-muted-foreground">
           <MapPin className="w-4 h-4 text-primary shrink-0" /> 
           <span className="text-sm font-medium">{data.location || "Masjid Jami' Al-Huda"}</span>
        </div>
        
        {/* Ustadz */}
        <div className="flex items-center gap-2.5 text-muted-foreground">
           <User className="w-4 h-4 text-primary shrink-0" /> 
           <span className="text-sm font-medium">{data.ustadz || "Tim DKM"}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 pb-5"> 
        <Button variant="outline" className="w-full border-border group-hover:border-primary group-hover:text-primary transition-colors hover:bg-secondary/10 h-10 rounded-lg font-semibold text-sm">
            Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  )
}