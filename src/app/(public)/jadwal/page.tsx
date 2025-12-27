import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPrayerTimes } from "@/services/prayer-api";

export default async function JadwalPage() {
  const todayPrayer = await getPrayerTimes();

  if (!todayPrayer) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Gagal Memuat Jadwal</h1>
          <p className="text-slate-600">Mohon periksa koneksi internet Anda dan coba muat ulang.</p>
        </div>
      </div>
    );
  }

  // 3. Kalau lolos pengecekan di atas, TypeScript tahu 'todayPrayer' pasti ada isinya (aman)
  const prayerMap = [
    { name: "Subuh", time: todayPrayer.fajr },
    { name: "Dzuhur", time: todayPrayer.dhuhr },
    { name: "Ashar", time: todayPrayer.asr },
    { name: "Maghrib", time: todayPrayer.maghrib },
    { name: "Isya", time: todayPrayer.isha },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">Jadwal Sholat</h1>
          <p className="text-lg text-slate-600">
            "Sesungguhnya shalat itu adalah fardhu yang ditentukan waktunya atas orang-orang yang beriman."
          </p>
          <div className="mt-4 font-bold text-primary text-sm tracking-wide uppercase">Q.S. An-Nisa: 103</div>
        </div>

        {/* Highlight Hari Ini */}
        <Card className="border-none shadow-xl bg-white mb-10 overflow-hidden">
          <div className="bg-primary px-6 py-4">
             <h2 className="text-white font-bold text-lg text-center">Waktu Sholat Hari Ini</h2>
          </div>
          <CardContent className="p-0">
             <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {prayerMap.map((p, i) => (
                  <div key={i} className="py-6 text-center hover:bg-slate-50 transition-colors">
                     <p className="text-sm font-medium text-slate-500 mb-1">{p.name}</p>
                     <p className="text-xl md:text-2xl font-bold text-slate-900 font-sans">{p.time}</p>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>

        {/* Tabel Jadwal Bulanan */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Jadwal Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Tanggal</TableHead>
                  <TableHead>Subuh</TableHead>
                  <TableHead>Dzuhur</TableHead>
                  <TableHead>Ashar</TableHead>
                  <TableHead>Maghrib</TableHead>
                  <TableHead>Isya</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Simulasi Data (Karena todayPrayer aman, kita bisa pakai datanya) */}
                {[1, 2, 3, 4, 5].map((date) => (
                  <TableRow key={date}>
                    <TableCell className="font-medium">{date} Des</TableCell>
                    {/* Menggunakan data hari ini sebagai contoh */}
                    <TableCell>{todayPrayer.fajr}</TableCell>
                    <TableCell>{todayPrayer.dhuhr}</TableCell>
                    <TableCell>{todayPrayer.asr}</TableCell>
                    <TableCell>{todayPrayer.maghrib}</TableCell>
                    <TableCell>{todayPrayer.isha}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-center text-sm text-slate-500 italic">
              * Jadwal mengikuti waktu daerah setempat.
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}