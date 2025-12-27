export interface PrayerTimes {
  fajr: string;    // Subuh
  dhuhr: string;   // Dzuhur
  asr: string;     // Ashar
  maghrib: string; // Maghrib
  isha: string;    // Isya
  imsak: string;   // Imsak
  sunrise: string; // Terbit
  date: string;    // Tanggal
}

export interface PrayerApiResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Sunrise: string;
      [key: string]: string;
    };
    date: {
      readable: string;
      timestamp: string;
    };
  };
}