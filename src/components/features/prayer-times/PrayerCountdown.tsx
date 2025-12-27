"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Timer } from "lucide-react";

dayjs.extend(customParseFormat);

export function PrayerCountdown({ schedules }: { schedules: any }) {
  const [displayTime, setDisplayTime] = useState("-- : -- : --");
  const [nextPrayerName, setNextPrayerName] = useState("...");

  useEffect(() => {
    // Logika Timer (Dummy Simulation)
    const timer = setInterval(() => {
      // Di real app, gunakan logika selisih waktu asli
      setNextPrayerName("Maghrib");
      
      const now = dayjs();
      const target = dayjs().endOf('day'); 
      const diff = target.diff(now);
      const formatted = dayjs(diff).format("HH : mm : ss");
      
      setDisplayTime(formatted); 
    }, 1000);

    return () => clearInterval(timer);
  }, [schedules]);

  return (
    <div className="flex items-center gap-3">
      <div className="text-center md:text-right">
        <p className="text-[10px] md:text-xs uppercase tracking-widest text-primary-foreground/80 font-sans font-semibold mb-1">
          Menuju {nextPrayerName}
        </p>
        {/* tabular-nums wajib ada biar lebar angka tetap sama (tidak goyang) */}
        <p className="text-xl md:text-2xl font-bold font-sans tabular-nums leading-none tracking-tight">
          -{displayTime}
        </p>
      </div>
      
      {/* Ikon Animasi */}
      <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white animate-pulse">
        <Timer className="w-5 h-5" />
      </div>
    </div>
  );
}