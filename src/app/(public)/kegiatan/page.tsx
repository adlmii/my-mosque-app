import { KEGIATAN_MASJID } from "@/lib/data-kegiatan";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

export default function KegiatanPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      
      {/* Header Halaman */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Agenda & Kegiatan Masjid
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Ikuti berbagai kegiatan positif untuk memakmurkan masjid dan mempererat tali silaturahmi antar jamaah.
        </p>
      </div>

      {/* Grid Card Kegiatan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {KEGIATAN_MASJID.map((item) => (
          <Card key={item.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            
            {/* Bagian Gambar */}
            <div className="relative h-48 w-full bg-slate-200">
              {/* Note: Di production nanti pakai Next/Image biar cepat.
                  Untuk sekarang pakai img biasa biar praktis. */}
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-white/90 text-primary font-bold shadow-sm hover:bg-white">
                  {item.category}
                </Badge>
              </div>
            </div>

            {/* Bagian Konten */}
            <CardHeader>
              <CardTitle className="line-clamp-2 leading-tight">
                {item.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Clock className="h-4 w-4" />
                <span>{item.date}</span>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1">
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </CardContent>

            <CardFooter>
              <Button className="w-full" variant="outline">
                Lihat Detail
              </Button>
            </CardFooter>

          </Card>
        ))}
      </div>

    </div>
  );
}