"use client";

import { useState, useEffect } from "react";
import { PrayerTimes } from "@/types/prayer";
import { PrayerCountdown } from "./PrayerCountdown";
import { Button } from "@/components/ui/button";
import { MapPin, RefreshCw } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation";
import dayjs from "@/lib/dayjs";

interface PrayerTimesWidgetProps {
  initialData: PrayerTimes | null;
}

export function PrayerTimesWidget({ initialData }: PrayerTimesWidgetProps) {
  const [jadwal, setJadwal] = useState<PrayerTimes | null>(initialData);
  const [loading, setLoading] = useState(false);
  const { location, getLocation } = useGeolocation();

  // Efek ketika lokasi berhasil didapatkan
  useEffect(() => {
    if (location.coordinates) {
      fetchNewSchedule(location.coordinates.lat, location.coordinates.lng);
    }
  }, [location.coordinates]);

  // Fungsi Fetch Data Baru (Client Side)
  const fetchNewSchedule = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const today = dayjs().format("DD-MM-YYYY");
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${today}?latitude=${lat}&longitude=${lng}&method=20`
      );
      const json = await res.json();
      const timings = json.data.timings;

      // Format ulang data manual karena kita tidak pakai service server disini
      const cleanTime = (time: string) => time.split(" ")[0];
      setJadwal({
        fajr: cleanTime(timings.Fajr),
        dhuhr: cleanTime(timings.Dhuhr),
        asr: cleanTime(timings.Asr),
        maghrib: cleanTime(timings.Maghrib),
        isha: cleanTime(timings.Isha),
        imsak: cleanTime(timings.Imsak),
        sunrise: cleanTime(timings.Sunrise),
        date: json.data.date.readable,
      });
    } catch (error) {
      console.error("Gagal update jadwal:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!jadwal) return <div className="text-red-500">Data tidak tersedia</div>;

  return (
    <div className="w-full max-w-4xl mt-8 space-y-6">
      
      {/* Tombol Lokasi */}
      <div className="flex justify-center items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={getLocation} 
          disabled={loading}
          className="rounded-full"
        >
          {loading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="mr-2 h-4 w-4" />
          )}
          {loading ? "Sedang Mengambil..." : "Sesuaikan dengan Lokasiku"}
        </Button>
      </div>

      {/* 1. Komponen Countdown */}
      <div className="flex justify-center">
        <PrayerCountdown schedule={jadwal} />
      </div>

      {/* 2. Daftar Jadwal Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { name: "Subuh", time: jadwal.fajr },
          { name: "Dzuhur", time: jadwal.dhuhr },
          { name: "Ashar", time: jadwal.asr },
          { name: "Maghrib", time: jadwal.maghrib },
          { name: "Isya", time: jadwal.isha },
        ].map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center p-4 bg-white rounded-lg border shadow-sm hover:border-primary transition-colors"
          >
            <span className="text-xs text-slate-500 uppercase font-bold">
              {item.name}
            </span>
            <span className="text-xl font-bold text-slate-800">
              {item.time}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        {location.coordinates 
          ? "✅ Jadwal disesuaikan dengan lokasi Anda." 
          : "*Jadwal Default: Jakarta Pusat (WIB)"}
      </p>
    </div>
  );
}