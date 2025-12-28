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
    const timer = setInterval(() => {
      setNextPrayerName("Maghrib"); // Logic placeholder
      
      const now = dayjs();
      const target = dayjs().endOf('day'); 
      const diff = target.diff(now);
      const formatted = dayjs(diff).format("HH : mm : ss");
      
      setDisplayTime(formatted); 
    }, 1000);

    return () => clearInterval(timer);
  }, [schedules]);

  return (
    <div className="flex items-center gap-4">
      <div className="text-center md:text-right">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/80 font-sans font-bold mb-1">
          Menuju {nextPrayerName}
        </p>
        <p className="text-2xl md:text-3xl font-bold font-sans tabular-nums leading-none tracking-tight text-white drop-shadow-sm">
          -{displayTime}
        </p>
      </div>
      
      {/* Ikon Animasi */}
      <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white animate-pulse border border-white/20 backdrop-blur-sm">
        <Timer className="w-6 h-6" />
      </div>
    </div>
  );
}