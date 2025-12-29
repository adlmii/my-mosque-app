import dayjs from "@/lib/dayjs";
import { PrayerTimes } from "@/types/prayer";

export function getCurrentPrayerTime(timings: PrayerTimes): string {
  const now = dayjs();
  
  const time = (timeString: string) => {
    const [hour, minute] = timeString.split(':').map(Number);
    return dayjs().hour(hour).minute(minute).second(0).millisecond(0);
  };

  const subuh = time(timings.fajr);
  const dzuhur = time(timings.dhuhr);
  const ashar = time(timings.asr);
  const maghrib = time(timings.maghrib);
  const isya = time(timings.isha);
  
  // --- LOGIKA PENENTUAN WAKTU AKTIF ---
  // 1. Dini hari sebelum Subuh (Masih masuk waktu Isya malam sebelumnya)
  if (now.isBefore(subuh)) return "Isya";

  // 2. Pagi sebelum Dzuhur (Sedang berlangsung waktu Subuh)
  if (now.isBefore(dzuhur)) return "Subuh";

  // 3. Siang sebelum Ashar (Sedang berlangsung waktu Dzuhur)
  if (now.isBefore(ashar)) return "Dzuhur";

  // 4. Sore sebelum Maghrib (Sedang berlangsung waktu Ashar)
  if (now.isBefore(maghrib)) return "Ashar";

  // 5. Petang sebelum Isya (Sedang berlangsung waktu Maghrib)
  if (now.isBefore(isya)) return "Maghrib";

  // 6. Malam setelah masuk waktu Isya
  return "Isya";
}