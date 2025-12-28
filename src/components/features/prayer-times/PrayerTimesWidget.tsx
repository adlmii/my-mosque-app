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
    <div className="w-full max-w-4xl mx-auto mt-8 relative z-20 px-4 md:px-0">
      {/* Card dengan p-0 untuk hapus white space */}
      <Card className="border-none shadow-2xl bg-white overflow-hidden ring-1 ring-slate-900/5 p-0">
        
        {/* === HEADER (Hijau) === */}
        <div className="bg-primary px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
          
          {/* Lokasi */}
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-white/90" />
            <span className="font-sans font-medium text-sm tracking-wide">
              Jakarta Selatan, WIB
            </span>
          </div>

          {/* Countdown Component */}
          <PrayerCountdown schedules={initialData} />
        </div>

        {/* === ISI JADWAL === */}
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {times.map((t, idx) => (
            <div 
              key={idx} 
              className="flex-1 flex md:flex-col items-center justify-between md:justify-center p-4 md:py-8 hover:bg-slate-50 transition-colors group"
            >
              {/* Ikon & Label */}
              <div className="flex items-center gap-3 md:gap-2 md:flex-col md:mb-2">
                <div className="p-2 bg-slate-100 rounded-full text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  {t.icon}
                </div>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500 font-sans">
                  {t.label}
                </span>
              </div>

              {/* Jam Sholat */}
              <span className="text-xl md:text-2xl font-bold text-slate-900 font-sans tabular-nums group-hover:scale-110 transition-transform duration-300">
                {t.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}