"use client";

import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MASJID_INFO } from "@/lib/data-masjid";

export function MosqueMap() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-secondary/10 via-accent/5 to-white font-optimized relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Bagian Teks & Informasi */}
          <div className="w-full md:w-1/3 space-y-8">
             <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  <MapPin className="w-3 h-3" />
                  Lokasi Kami
               </div>
               <h2 className="section-header text-foreground">
                 Kunjungi Masjid
               </h2>
               <p className="text-balance text-muted-foreground leading-relaxed">
                 {MASJID_INFO.nama} terbuka untuk umum 24 jam. Kami menantikan kehadiran Anda untuk memakmurkan rumah Allah bersama-sama.
               </p>
             </div>

             <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm">
                   <div className="p-2 bg-primary/10 rounded-lg text-primary">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div>
                     <h4 className="font-bold text-foreground text-sm">Alamat Lengkap</h4>
                     {/* Data Alamat Dinamis */}
                     <p className="text-sm text-muted-foreground mt-1">
                       {MASJID_INFO.alamat}
                     </p>
                   </div>
                </div>
             </div>

             <Button 
               size="lg" 
               variant="outline" 
               className="w-full border-primary/20 text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-lg transition-all duration-300 font-semibold" 
               asChild
             >
               <a 
                 href={MASJID_INFO.googleMapUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
               >
                 <Navigation className="w-4 h-4 mr-2 fill-current" />
                 Petunjuk Arah (Google Maps)
               </a>
             </Button>
          </div>

          {/* Bagian Peta (Iframe) */}
          <div className="w-full md:w-2/3">
            <Card className="overflow-hidden border-none shadow-2xl rounded-3xl h-[400px] md:h-[500px] relative z-10 bg-white ring-1 ring-slate-900/5">
              <iframe 
                src={MASJID_INFO.googleMapEmbed}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}