import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPrayerTimes } from "@/services/prayer-api";
import { Calendar, Download, MapPin, Clock, Info, MoonStar, Sun, Sunrise, Sunset, CloudSun } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/id";

// Aktifkan plugin parsing custom agar bisa baca format "HH:mm"
dayjs.extend(customParseFormat);

export default async function JadwalPage() {
  const todayPrayer = await getPrayerTimes();
  
  // Setup Tanggal & Bulan
  dayjs.locale("id");
  const now = dayjs();
  const currentMonthName = now.format("MMMM YYYY"); 
  const daysInMonth = now.daysInMonth();
  
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => {
    const date = dayjs().date(i + 1);
    return {
      dateObj: date,
      dateNum: date.format("DD"),
      dayName: date.format("dddd"),
      isToday: date.isSame(now, 'day')
    };
  });

  // Error Handling UI
  if (!todayPrayer) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center space-y-4 font-optimized">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Gagal Memuat Jadwal</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Mohon periksa koneksi internet Anda. Kami mengalami kendala saat mengambil data waktu sholat terbaru.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">Coba Lagi</Button>
      </div>
    );
  }

  // --- LOGIKA MENENTUKAN WAKTU AKTIF ---
  const getPrayerTimeObj = (timeStr: string) => dayjs(timeStr, "HH:mm");

  const subuhTime = getPrayerTimeObj(todayPrayer.fajr);
  const dzuhurTime = getPrayerTimeObj(todayPrayer.dhuhr);
  const asharTime = getPrayerTimeObj(todayPrayer.asr);
  const maghribTime = getPrayerTimeObj(todayPrayer.maghrib);
  const isyaTime = getPrayerTimeObj(todayPrayer.isha);

  let currentActive = "Isya"; 

  if (now.isAfter(subuhTime) && now.isBefore(dzuhurTime)) {
    currentActive = "Subuh";
  } else if (now.isAfter(dzuhurTime) && now.isBefore(asharTime)) {
    currentActive = "Dzuhur";
  } else if (now.isAfter(asharTime) && now.isBefore(maghribTime)) {
    currentActive = "Ashar";
  } else if (now.isAfter(maghribTime) && now.isBefore(isyaTime)) {
    currentActive = "Maghrib";
  } else if (now.isAfter(isyaTime) || now.isBefore(subuhTime)) {
    currentActive = "Isya";
  }

  // Mapping Data dengan Icon Baru & Status Aktif
  const prayerMap = [
    { 
      name: "Subuh", 
      time: todayPrayer.fajr, 
      icon: <Sunrise className="w-6 h-6" />, 
      isActive: currentActive === "Subuh" 
    },
    { 
      name: "Dzuhur", 
      time: todayPrayer.dhuhr, 
      icon: <Sun className="w-6 h-6" />, 
      isActive: currentActive === "Dzuhur" 
    },
    { 
      name: "Ashar", 
      time: todayPrayer.asr, 
      icon: <CloudSun className="w-6 h-6" />, 
      isActive: currentActive === "Ashar" 
    },
    { 
      name: "Maghrib", 
      time: todayPrayer.maghrib, 
      icon: <Sunset className="w-6 h-6" />, 
      isActive: currentActive === "Maghrib" 
    },
    { 
      name: "Isya", 
      time: todayPrayer.isha, 
      icon: <MoonStar className="w-6 h-6" />, 
      isActive: currentActive === "Isya" 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-optimized pb-24">
      
      {/* === HERO SECTION === */}
      <section className="bg-white border-b border-border/60 pt-20 pb-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
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
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-10 space-y-12">
        <Card className="border-none shadow-2xl bg-gradient-to-br from-primary via-primary to-emerald-950 text-primary-foreground overflow-hidden rounded-3xl ring-1 ring-white/20 relative group">
          
          {/* Decorative Background Patterns */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light pointer-events-none"></div>

          <div className="p-8 md:p-12 relative z-10">
            
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-12">
              
              <div className="text-center lg:text-left space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest text-white/90 mb-2 shadow-lg shadow-black/5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse box-shadow-glow"></span>
                  Hari Ini
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-sm">
                  {now.format("dddd,")} <br className="hidden md:block" /> 
                  <span className="text-white/90">{now.format("D MMMM YYYY")}</span>
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary-foreground/80 font-sans font-medium pt-2">
                  <MapPin className="w-4 h-4" />
                  <span>Jakarta & Sekitarnya</span>
                </div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center lg:items-end">
                   <div className="text-7xl md:text-8xl font-bold font-sans tabular-nums tracking-tighter text-white drop-shadow-2xl leading-none">
                     {now.format("HH:mm")}
                   </div>
                   <p className="text-lg text-primary-foreground/70 font-medium mt-2">Waktu Indonesia Barat</p>
                </div>
              </div>
            </div>

            {/* Bottom Section: Prayer Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {prayerMap.map((p, i) => (
                <div 
                  key={i} 
                  className={`
                    relative overflow-hidden rounded-2xl p-5 transition-all duration-500 group/card 
                    text-center md:text-left flex flex-col justify-between h-32 md:h-40
                    ${p.isActive 
                      ? "bg-white text-emerald-900 shadow-2xl scale-105 ring-4 ring-emerald-400/30 z-10"
                      : "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                    }
                  `}
                >
                   {/* Background Glow untuk Active State */}
                   {p.isActive && (
                      <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
                   )}

                   <div className="relative z-10 flex justify-between items-start mb-4">
                      <div className={`
                        p-2 rounded-lg transition-colors duration-300 shadow-sm
                        ${p.isActive 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-white/10 text-white/90 group-hover/card:bg-white group-hover/card:text-emerald-800"
                        }
                      `}>
                        {p.icon}
                      </div>
                      
                      {/* Tampilkan indikator 'Now' HANYA jika aktif. ChevronRight sudah dihapus. */}
                      {p.isActive && (
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                      )}
                   </div>
                   
                   <div className="relative z-10 space-y-1">
                     <p className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${p.isActive ? "text-emerald-600/70" : "text-white/60 group-hover/card:text-white/90"}`}>
                       {p.name}
                     </p>
                     <p className={`text-2xl md:text-3xl font-bold font-sans tabular-nums tracking-tight transition-transform duration-300 ${p.isActive ? "text-emerald-950 scale-100" : "text-white group-hover/card:scale-105 origin-left"}`}>
                       {p.time}
                     </p>
                   </div>
                </div>
              ))}
            </div>

          </div>
        </Card>

        {/* === 2. TABEL BULANAN === */}
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border shadow-sm bg-white">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-serif font-bold text-lg text-foreground">Informasi</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Jadwal sholat ini dihitung berdasarkan kriteria Kementerian Agama Republik Indonesia (Kemenag).
                </p>
                <div className="pt-2">
                  <Button variant="outline" className="w-full justify-between group bg-secondary/30 hover:bg-secondary hover:text-primary-foreground border-border transition-all text-foreground">
                    <span>Unduh PDF</span>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-2 -mr-2 w-12 h-12 bg-primary/10 rounded-full blur-xl"></div>
               <h4 className="font-bold text-primary mb-2 text-sm flex items-center gap-2">
                 <Info className="w-4 h-4" />
                 Catatan Penting
               </h4>
               <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                 Disarankan untuk menambahkan waktu ikhtiyat (pengaman) sekitar 2-3 menit dari jadwal yang tertera demi kehati-hatian.
               </p>
            </div>
          </div>

          {/* Tabel Utama */}
          <div className="lg:col-span-3">
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
                          ${item.isToday 
                            ? "bg-primary/5 hover:bg-primary/10" 
                            : "hover:bg-secondary/30"
                          }
                        `}
                      >
                        <TableCell className="pl-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm transition-all
                              ${item.isToday 
                                ? "bg-primary text-white scale-110 shadow-primary/30" 
                                : "bg-white border border-border text-muted-foreground"
                              }
                            `}>
                              {item.dateNum}
                            </div>
                            <span className={`font-medium ${item.isToday ? "text-primary font-bold" : "text-muted-foreground"}`}>
                              {item.dayName}
                            </span>
                          </div>
                        </TableCell>
                        
                        <TableCell className={`text-center tabular-nums text-base ${item.isToday ? "font-bold text-primary" : "text-muted-foreground"}`}>{todayPrayer.fajr}</TableCell>
                        <TableCell className={`text-center tabular-nums text-base ${item.isToday ? "font-bold text-primary" : "text-muted-foreground"}`}>{todayPrayer.dhuhr}</TableCell>
                        <TableCell className={`text-center tabular-nums text-base ${item.isToday ? "font-bold text-primary" : "text-muted-foreground"}`}>{todayPrayer.asr}</TableCell>
                        <TableCell className={`text-center tabular-nums text-base ${item.isToday ? "font-bold text-primary" : "text-muted-foreground"}`}>{todayPrayer.maghrib}</TableCell>
                        <TableCell className={`text-center tabular-nums text-base ${item.isToday ? "font-bold text-primary pr-6" : "text-muted-foreground pr-6"}`}>{todayPrayer.isha}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}