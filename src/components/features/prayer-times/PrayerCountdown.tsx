"use client";

import { useState, useEffect } from "react";
import { useCurrentTime } from "@/hooks/use-current-time";
import { PrayerTimes } from "@/types/prayer";
import dayjs from "@/lib/dayjs";
import { Card } from "@/components/ui/card";

interface PrayerCountdownProps {
  schedule: PrayerTimes;
}

export function PrayerCountdown({ schedule }: PrayerCountdownProps) {
  const now = useCurrentTime();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- LOGIKA HITUNGAN ---
  const getPrayerDate = (timeStr: string) => {
    const [hour, minute] = timeStr.split(":").map(Number);
    return dayjs().hour(hour).minute(minute).second(0);
  };

  const prayers = [
    { name: "Subuh", time: getPrayerDate(schedule.fajr) },
    { name: "Dzuhur", time: getPrayerDate(schedule.dhuhr) },
    { name: "Ashar", time: getPrayerDate(schedule.asr) },
    { name: "Maghrib", time: getPrayerDate(schedule.maghrib) },
    { name: "Isya", time: getPrayerDate(schedule.isha) },
  ];

  let nextPrayer = prayers.find((p) => p.time.isAfter(now));
  let isTomorrow = false;

  if (!nextPrayer) {
    nextPrayer = prayers[0];
    isTomorrow = true;
  }

  const targetTime = isTomorrow ? nextPrayer.time.add(1, "day") : nextPrayer.time;
  const diff = targetTime.diff(now);
  
  const duration = dayjs.duration(diff);
  const hours = duration.hours().toString().padStart(2, "0");
  const minutes = duration.minutes().toString().padStart(2, "0");
  const seconds = duration.seconds().toString().padStart(2, "0");

  if (!mounted) {
    return (
      <Card className="p-6 bg-primary text-primary-foreground text-center shadow-xl transform hover:scale-105 transition-transform duration-300">
        <p className="text-sm font-medium opacity-90 mb-1">
          Memuat Waktu...
        </p>
        <div className="text-5xl font-bold tracking-widest font-mono">
          --:--:--
        </div>
        <p className="text-xs mt-2 opacity-75">
          Menyiapkan jadwal...
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-primary text-primary-foreground text-center shadow-xl transform hover:scale-105 transition-transform duration-300">
      <p className="text-sm font-medium opacity-90 mb-1">
        Menuju Waktu {nextPrayer.name}
      </p>
      <div className="text-5xl font-bold tracking-widest font-mono">
        {hours}:{minutes}:{seconds}
      </div>
      <p className="text-xs mt-2 opacity-75">
        {isTomorrow ? "Besok, " : "Hari ini, "} 
        {nextPrayer.time.format("HH:mm")} WIB
      </p>
    </Card>
  );
}