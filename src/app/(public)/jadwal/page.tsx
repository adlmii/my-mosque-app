import { getMonthlySchedule } from "@/services/prayer-api";
import dayjs from "@/lib/dayjs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export default async function JadwalPage() {
  // Ambil Tanggal Hari Ini
  const currentMonth = dayjs().month() + 1;
  const currentYear = dayjs().year();
  const todayString = dayjs().format("DD");

  // Fetch Data Bulanan
  const monthlySchedule = await getMonthlySchedule(currentYear, currentMonth);

  return (
    <div className="container mx-auto py-12 px-4">
      
      {/* Header Halaman */}
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Jadwal Sholat Lengkap
        </h1>
        <p className="text-muted-foreground">
          Bulan {dayjs().format("MMMM YYYY")} • Wilayah DKI Jakarta & Sekitarnya
        </p>
      </div>

      {/* Tabel Jadwal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Tabel Waktu Sholat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Waktu sholat berdasarkan Kemenag RI / Aladhan.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">Tanggal</TableHead>
                <TableHead className="text-center font-bold text-primary">Subuh</TableHead>
                <TableHead className="text-center">Dzuhur</TableHead>
                <TableHead className="text-center">Ashar</TableHead>
                <TableHead className="text-center">Maghrib</TableHead>
                <TableHead className="text-center">Isya</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlySchedule.map((day, index) => {
                // Cek apakah baris ini adalah hari ini?
                const isToday = day.day === todayString;
                
                return (
                  <TableRow 
                    key={index} 
                    className={isToday ? "bg-primary/10 hover:bg-primary/20" : ""}
                  >
                    <TableCell className="font-medium">
                      {day.date} 
                      {isToday && <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">Hari Ini</span>}
                    </TableCell>
                    <TableCell className="text-center font-bold text-primary">{day.fajr}</TableCell>
                    <TableCell className="text-center">{day.dhuhr}</TableCell>
                    <TableCell className="text-center">{day.asr}</TableCell>
                    <TableCell className="text-center">{day.maghrib}</TableCell>
                    <TableCell className="text-center">{day.isha}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}