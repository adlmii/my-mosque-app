import { Metadata } from "next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPrayerTimes } from "@/services/prayer-api";
import { Clock, Download, Info } from "lucide-react";
import { PrayerTimesWidget } from "@/components/features/prayer-times/PrayerTimesWidget";
import { getCurrentMonthName, getMonthDates } from "@/lib/date-utils"; 
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Jadwal Sholat",
  description: "Jadwal sholat fardhu 5 waktu dan imsakiyah hari ini.",
};

export default async function JadwalPage() {
  const todayPrayer = await getPrayerTimes();
  const currentMonthName = getCurrentMonthName(); 
  const datesArray = getMonthDates();

  // Error Handling UI
  if (!todayPrayer) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center space-y-4 font-optimized">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Gagal Memuat Jadwal</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Mohon periksa koneksi internet Anda.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">Coba Lagi</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-optimized pb-24">
      
      {/* === HERO SECTION === */}
      <section className="bg-white border-b border-border/60 pt-20 pb-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 bg-primary/5 text-primary font-bold tracking-wider">
              SHOLAT ITU TIANG AGAMA
            </Badge>
            <h1 className="display-md mb-6 text-foreground">
              Jadwal Sholat & Imsakiyah
            </h1>
            <div className="max-w-2xl mx-auto space-y-6">
              <blockquote className="text-xl md:text-2xl text-foreground/80 font-serif italic leading-relaxed">
                "Sesungguhnya shalat itu adalah fardhu yang ditentukan waktunya atas orang-orang yang beriman."
              </blockquote>
              <cite className="block text-sm font-bold uppercase tracking-widest text-primary not-italic">
                — Q.S. An-Nisa: 103
              </cite>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* === WIDGET SECTION === */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 space-y-12">
        
        <FadeIn delay={0.2}>
          <PrayerTimesWidget initialData={todayPrayer} />
        </FadeIn>

        {/* === TABEL BULANAN === */}
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            <FadeIn delay={0.3}>
              <Card className="border-border shadow-sm bg-white">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-serif font-bold text-lg text-foreground">Informasi</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Jadwal sholat ini dihitung berdasarkan kriteria Kementerian Agama Republik Indonesia (Kemenag).
                  </p>
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-between group border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      <span className="font-semibold">Unduh PDF</span>
                      <Download className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 relative overflow-hidden mt-6">
                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-12 h-12 bg-primary/10 rounded-full blur-xl"></div>
                <h4 className="font-bold text-primary mb-2 text-sm flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Catatan Penting
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  Disarankan untuk menambahkan waktu ikhtiyat (pengaman) sekitar 2-3 menit.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Tabel Utama */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.4}>
              <Card className="border-border shadow-lg bg-white overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-secondary/30 px-6 py-5 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-serif text-xl font-bold text-foreground">Jadwal {currentMonthName}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 font-sans">Waktu Indonesia Barat (WIB)</p>
                  </div>
                </CardHeader>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-transparent hover:bg-transparent border-b border-border/60">
                        <TableHead className="w-[180px] font-bold text-foreground py-5 pl-6">Tanggal</TableHead>
                        <TableHead className="font-bold text-foreground text-center">Subuh</TableHead>
                        <TableHead className="font-bold text-foreground text-center">Dzuhur</TableHead>
                        <TableHead className="font-bold text-foreground text-center">Ashar</TableHead>
                        <TableHead className="font-bold text-foreground text-center">Maghrib</TableHead>
                        <TableHead className="font-bold text-foreground text-center pr-6">Isya</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {datesArray.map((item, idx) => (
                        <TableRow 
                          key={idx} 
                          className={`
                            transition-colors border-b border-border/40 font-sans
                            ${item.isToday ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-secondary/30"}
                          `}
                        >
                          <TableCell className="pl-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`
                                w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm transition-all
                                ${item.isToday ? "bg-primary text-white" : "bg-white border border-border text-muted-foreground"}
                              `}>
                                {item.dateNum}
                              </div>
                              <span className={`font-medium ${item.isToday ? "text-primary font-bold" : "text-muted-foreground"}`}>
                                {item.dayName}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center tabular-nums">{todayPrayer.fajr}</TableCell>
                          <TableCell className="text-center tabular-nums">{todayPrayer.dhuhr}</TableCell>
                          <TableCell className="text-center tabular-nums">{todayPrayer.asr}</TableCell>
                          <TableCell className="text-center tabular-nums">{todayPrayer.maghrib}</TableCell>
                          <TableCell className="text-center tabular-nums pr-6">{todayPrayer.isha}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>

      </div>
    </div>
  );
}