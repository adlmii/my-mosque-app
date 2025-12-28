import dayjs from "@/lib/dayjs";

export function getCurrentPrayerTime(timings: any) {
  const now = dayjs();
  const getObj = (t: string) => dayjs(t, "HH:mm");

  const subuh = getObj(timings.fajr);
  const dzuhur = getObj(timings.dhuhr);
  const ashar = getObj(timings.asr);
  const maghrib = getObj(timings.maghrib);
  const isya = getObj(timings.isha);

  if (now.isAfter(subuh) && now.isBefore(dzuhur)) return "Subuh";
  if (now.isAfter(dzuhur) && now.isBefore(ashar)) return "Dzuhur";
  if (now.isAfter(ashar) && now.isBefore(maghrib)) return "Ashar";
  if (now.isAfter(maghrib) && now.isBefore(isya)) return "Maghrib";
  
  // Default fallback
  return "Isya";
}