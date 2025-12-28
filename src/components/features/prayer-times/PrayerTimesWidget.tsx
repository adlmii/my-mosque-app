"use client";

import { Card } from "@/components/ui/card";
import { PrayerCountdown } from "./PrayerCountdown";
import { MapPin, Moon, Sun, Sunrise, Sunset } from "lucide-react";

interface PrayerTimesWidgetProps {
  initialData: any; 
}

export function PrayerTimesWidget({ initialData }: PrayerTimesWidgetProps) {
  
  if (!initialData) return null;

  const times = [
    { label: "Subuh", time: initialData.fajr, icon: <Moon className="w-4 h-4" /> },
    { label: "Dzuhur", time: initialData.dhuhr, icon: <Sun className="w-4 h-4" /> },
    { label: "Ashar", time: initialData.asr, icon: <Sunset className="w-4 h-4" /> },
    { label: "Maghrib", time: initialData.maghrib, icon: <Sunrise className="w-4 h-4" /> },
    { label: "Isya", time: initialData.isha, icon: <Moon className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 relative z-20 px-4 md:px-0">
      <Card className="border-none shadow-2xl bg-white overflow-hidden ring-1 ring-slate-900/5 p-0 rounded-2xl">
        
        {/* === HEADER (Hijau) === */}
        <div className="bg-primary px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-6 text-white">
          
          {/* Lokasi */}
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <MapPin className="w-4 h-4 text-white/90" />
            <span className="font-sans font-bold text-sm tracking-wide">
              Jakarta Selatan, WIB
            </span>
          </div>

          <PrayerCountdown schedules={initialData} />
        </div>

        {/* === ISI JADWAL === */}
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {times.map((t, idx) => (
            <div 
              key={idx} 
              className="flex-1 flex md:flex-col items-center justify-between md:justify-center p-5 md:py-8 hover:bg-secondary/50 transition-colors group cursor-default"
            >
              {/* Ikon & Label */}
              <div className="flex items-center gap-3 md:gap-2 md:flex-col md:mb-3">
                <div className="p-2.5 bg-secondary rounded-full text-secondary-foreground/70 group-hover:text-primary-foreground group-hover:bg-primary transition-colors duration-300">
                  {t.icon}
                </div>
                <span className="label text-muted-foreground group-hover:text-primary transition-colors">
                  {t.label}
                </span>
              </div>

              {/* Jam Sholat */}
              <span className="text-2xl md:text-3xl font-bold text-foreground font-sans tabular-nums tracking-tight group-hover:scale-110 transition-transform duration-300">
                {t.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}