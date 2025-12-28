"use client";

import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MosqueMap() {
  return (
    <section className="py-20 lg:py-24 bg-secondary/10 font-optimized">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
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
                 Masjid Jami' Al-Huda terbuka untuk umum 24 jam. Kami menantikan kehadiran Anda untuk memakmurkan rumah Allah bersama-sama.
               </p>
             </div>

             <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border/50 shadow-sm">
                   <div className="p-2 bg-primary/10 rounded-lg text-primary">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div>
                     <h4 className="font-bold text-foreground text-sm">Alamat Lengkap</h4>
                     <p className="text-sm text-muted-foreground mt-1">
                       Jl. Daan Mogot No.14, RT.005/RW.002, Batuceper, Tangerang, Banten
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
                 href="https://maps.app.goo.gl/Uec3yWCNGNBvs27Z6" 
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4782.837744998425!2d106.65698604869868!3d-6.162926277949428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f8ed1dd1b0ef%3A0x56f8d50d88067bd5!2sJami'%20Al-Huda%20Mosque!5e1!3m2!1sen!2sid!4v1766936671043!5m2!1sen!2sid"
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