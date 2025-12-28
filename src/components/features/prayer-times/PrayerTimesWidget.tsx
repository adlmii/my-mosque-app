"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Sunrise, Sun, CloudSun, Sunset, MoonStar } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/id";
import { getCurrentPrayerTime } from "@/lib/prayer-utils"; 

dayjs.extend(customParseFormat);
dayjs.locale("id");

interface PrayerTimesWidgetProps {
  initialData: any; 
}

export function PrayerTimesWidget({ initialData }: PrayerTimesWidgetProps) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(dayjs());
  const [activePrayer, setActivePrayer] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    if (!initialData) return;

    const updateTimeAndStatus = () => {
      // 1. Update Waktu Sekarang
      setNow(dayjs());

      // 2. Update Status Sholat Aktif (Logic diambil dari file utils)
      const currentActive = getCurrentPrayerTime(initialData);
      setActivePrayer(currentActive);
    };

    // Jalankan sekali saat mount
    updateTimeAndStatus();

    // Jalankan setiap detik agar jam terus berjalan
    const timer = setInterval(updateTimeAndStatus, 1000);

    return () => clearInterval(timer);
  }, [initialData]);

  if (!initialData) return null;

  // Mapping Ikon
  const icons: Record<string, any> = {
    Subuh: <Sunrise className="w-6 h-6" />,
    Dzuhur: <Sun className="w-6 h-6" />,
    Ashar: <CloudSun className="w-6 h-6" />,
    Maghrib: <Sunset className="w-6 h-6" />,
    Isya: <MoonStar className="w-6 h-6" />,
  };

  // Mapping Data Jadwal
  const prayerMap = [
    { name: "Subuh", time: initialData.fajr },
    { name: "Dzuhur", time: initialData.dhuhr },
    { name: "Ashar", time: initialData.asr },
    { name: "Maghrib", time: initialData.maghrib },
    { name: "Isya", time: initialData.isha },
  ];

  if (!mounted) return null;

  return (
    <div className="w-full mt-10 relative z-20 font-optimized">
      <Card className="border-none shadow-2xl bg-gradient-to-br from-primary via-primary to-emerald-950 text-primary-foreground overflow-hidden rounded-3xl ring-1 ring-white/20 relative group">
          
        {/* === Decorative Background Patterns === */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light pointer-events-none"></div>

        <div className="p-8 md:p-12 relative z-10">
          
          {/* === Top Section: Jam & Tanggal === */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-12">
            
            <div className="text-center lg:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest text-white/90 mb-2 shadow-lg shadow-black/5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse box-shadow-glow"></span>
                Hari Ini
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-sm">
                {now.format("dddd,")} <br className="hidden md:block" /> 
                <span className="text-white/90">{now.format("D MMMM YYYY")}</span>
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-primary-foreground/80 font-sans font-medium pt-2">
                <MapPin className="w-4 h-4" />
                <span>Tangerang & Sekitarnya</span>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center lg:items-end">
                 <div className="text-7xl md:text-8xl font-bold font-sans tabular-nums tracking-tighter text-white drop-shadow-2xl leading-none">
                   {now.format("HH:mm")}
                 </div>
                 <p className="text-lg text-primary-foreground/70 font-medium mt-2">Waktu Indonesia Barat</p>
              </div>
            </div>
          </div>

          {/* === Bottom Section: Prayer Cards === */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {prayerMap.map((p, i) => {
              const isActive = activePrayer === p.name;
              return (
                <div 
                  key={i} 
                  className={`
                    relative overflow-hidden rounded-2xl p-5 transition-all duration-500 group/card 
                    text-center md:text-left flex flex-col justify-between 
                    h-32 md:h-40
                    ${isActive 
                      ? "bg-white text-emerald-900 shadow-2xl scale-105 ring-4 ring-emerald-400/30 z-10"
                      : "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                    }
                  `}
                >
                   {isActive && (
                      <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
                   )}

                   <div className="relative z-10 flex justify-between items-start mb-4">
                      <div className={`
                        p-2 rounded-lg transition-colors duration-300 shadow-sm
                        ${isActive 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-white/10 text-white/90 group-hover/card:bg-white group-hover/card:text-emerald-800"
                        }
                      `}>
                        {icons[p.name]}
                      </div>
                      
                      {isActive && (
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                      )}
                   </div>
                   
                   <div className="relative z-10 space-y-1">
                     <p className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${isActive ? "text-emerald-600/70" : "text-white/60 group-hover/card:text-white/90"}`}>
                       {p.name}
                     </p>
                     <p className={`text-2xl md:text-3xl font-bold font-sans tabular-nums tracking-tight transition-transform duration-300 ${isActive ? "text-emerald-950 scale-100" : "text-white group-hover/card:scale-105 origin-left"}`}>
                       {p.time}
                     </p>
                   </div>
                </div>
              );
            })}
          </div>

        </div>
      </Card>
    </div>
  );
}