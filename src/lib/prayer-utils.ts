import dayjs from "@/lib/dayjs";
import { PrayerTimes } from "@/types/prayer";

export function getCurrentPrayerTime(timings: PrayerTimes): string {
  const now = dayjs();
  
  // Helper untuk membuat objek waktu hari ini
  const time = (t: string) => dayjs(t, "HH:mm");

  const subuh = time(timings.fajr);
  const dzuhur = time(timings.dhuhr);
  const ashar = time(timings.asr);
  const maghrib = time(timings.maghrib);
  const isya = time(timings.isha);
  
  // 1. Jika belum Subuh, berarti masih Isya (periode malam/dini hari)
  if (now.isBefore(subuh)) return "Isya";

  // 2. Jika belum Dzuhur (tapi sudah lewat Subuh), berarti Subuh
  if (now.isBefore(dzuhur)) return "Subuh";

  // 3. Jika belum Ashar, berarti Dzuhur
  if (now.isBefore(ashar)) return "Dzuhur";

  // 4. Jika belum Maghrib, berarti Ashar
  if (now.isBefore(maghrib)) return "Ashar";

  // 5. Jika belum Isya, berarti Maghrib
  if (now.isBefore(isya)) return "Maghrib";

  // 6. Jika sudah lewat Isya, berarti Isya
  return "Isya";
}