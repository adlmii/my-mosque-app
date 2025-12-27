import { PrayerApiResponse, PrayerTimes } from "@/types/prayer";
import dayjs from "@/lib/dayjs";

// Lokasi Default: Masjid Istiqlal, Jakarta
const DEFAULT_LAT = -6.1702;
const DEFAULT_LNG = 106.8310;

interface MonthlyApiResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
      [key: string]: string;
    };
    date: {
      readable: string;
      gregorian: { day: string; month: { number: number }; year: string };
    };
  }[];
}

// --- Waktu Solat ---
export async function getPrayerTimes(lat = DEFAULT_LAT, lng = DEFAULT_LNG): Promise<PrayerTimes | null> {
  try {
    // Kita ambil jadwal untuk hari ini
    const today = dayjs().format("DD-MM-YYYY");
    
    // Panggil API Aladhan
    const res = await fetch(
      `https://api.aladhan.com/v1/timings/${today}?latitude=${lat}&longitude=${lng}&method=20`, 
      { 
        next: { revalidate: 3600 }
      }
    );

    if (!res.ok) {
      throw new Error("Gagal mengambil data jadwal sholat");
    }

    const json: PrayerApiResponse = await res.json();
    const timings = json.data.timings;

    // Bersihkan format data agar siap dipakai di UI
    // API Aladhan kadang mengembalikan format "04:30 (WIB)", kita cuma butuh jamnya "04:30"
    const cleanTime = (time: string) => time.split(" ")[0];

    return {
      fajr: cleanTime(timings.Fajr),
      dhuhr: cleanTime(timings.Dhuhr),
      asr: cleanTime(timings.Asr),
      maghrib: cleanTime(timings.Maghrib),
      isha: cleanTime(timings.Isha),
      imsak: cleanTime(timings.Imsak),
      sunrise: cleanTime(timings.Sunrise),
      date: json.data.date.readable,
    };

  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
}

// --- Jadwal Solat ---
export async function getMonthlySchedule(year: number, month: number, lat = DEFAULT_LAT, lng = DEFAULT_LNG) {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lng}&method=20&month=${month}&year=${year}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error("Gagal mengambil jadwal bulanan");

    const json: MonthlyApiResponse = await res.json();
    
    return json.data.map((item) => {
      const cleanTime = (time: string) => time.split(" ")[0];
      return {
        date: item.date.readable, 
        day: item.date.gregorian.day,
        fajr: cleanTime(item.timings.Fajr),
        dhuhr: cleanTime(item.timings.Dhuhr),
        asr: cleanTime(item.timings.Asr),
        maghrib: cleanTime(item.timings.Maghrib),
        isha: cleanTime(item.timings.Isha),
      };
    });

  } catch (error) {
    console.error("Error fetching monthly schedule:", error);
    return [];
  }
}