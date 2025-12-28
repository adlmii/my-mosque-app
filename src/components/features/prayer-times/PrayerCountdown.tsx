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
    if (!schedules) return;

    const calculateCountdown = () => {
      const now = dayjs();
      
      // Daftar waktu sholat hari ini
      const prayers = [
        { name: "Subuh", time: dayjs(schedules.fajr, "HH:mm") },
        { name: "Dzuhur", time: dayjs(schedules.dhuhr, "HH:mm") },
        { name: "Ashar", time: dayjs(schedules.asr, "HH:mm") },
        { name: "Maghrib", time: dayjs(schedules.maghrib, "HH:mm") },
        { name: "Isya", time: dayjs(schedules.isha, "HH:mm") },
      ];

      // Cari waktu sholat yang BELUM lewat (waktu sholat > sekarang)
      let nextPrayer = prayers.find((p) => p.time.isAfter(now));
      
      // Jika semua sudah lewat (setelah Isya), maka targetnya adalah Subuh BESOK
      if (!nextPrayer) {
        nextPrayer = {
          name: "Subuh",
          time: dayjs(schedules.fajr, "HH:mm").add(1, "day"),
        };
      }

      setNextPrayerName(nextPrayer.name);

      // Hitung selisih waktu
      const diffMs = nextPrayer.time.diff(now);
      
      // Format durasi manual agar presisi (HH:mm:ss)
      const hours = Math.floor(diffMs / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);

      const formatNum = (n: number) => n.toString().padStart(2, "0");
      setDisplayTime(`${formatNum(hours)} : ${formatNum(minutes)} : ${formatNum(seconds)}`);
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

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