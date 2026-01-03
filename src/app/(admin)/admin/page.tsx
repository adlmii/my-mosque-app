import { auth } from "@/auth";
// [UPDATE]: Tambahkan CardFooter di import
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { db } from "@/db";
import { activities, financeRecords } from "@/db/schema";
import { desc, sql, eq } from "drizzle-orm";
import { CalendarDays, Wallet, ArrowUpRight, ArrowDownRight, Users, ArrowRight, Repeat } from "lucide-react";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DashboardFilter } from "./dashboard-filter";

// Helper Component untuk Kartu Statistik
function StatCard({ title, value, icon: Icon, type = "default" }: any) {
  const isPrimary = type === "primary";
  
  return (
    <Card className={`shadow-sm border-border overflow-hidden relative ${isPrimary ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className={`text-sm font-sans font-medium tracking-wide uppercase ${isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${isPrimary ? "text-primary-foreground" : "text-primary"}`} />
      </CardHeader>
      <CardContent className="relative z-10">
        <div className={`text-3xl font-serif font-bold ${isPrimary ? "text-white" : "text-foreground"}`}>
          {value}
        </div>
      </CardContent>
      {isPrimary && (
        <div className="absolute -right-6 -bottom-6 opacity-10">
          <Icon className="w-32 h-32" />
        </div>
      )}
    </Card>
  );
}

// Tambahkan prop searchParams
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminDashboard({ searchParams }: Props) {
  const session = await auth();
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams.filter as string | undefined;

  // 1. Query Keuangan
  const [financeStats] = await db
    .select({
      totalMasuk: sql<number>`sum(case when ${financeRecords.type} = 'pemasukan' then ${financeRecords.amount} else 0 end)`,
      totalKeluar: sql<number>`sum(case when ${financeRecords.type} = 'pengeluaran' then ${financeRecords.amount} else 0 end)`,
    })
    .from(financeRecords);

  const totalMasuk = Number(financeStats?.totalMasuk || 0);
  const totalKeluar = Number(financeStats?.totalKeluar || 0);
  const saldoAkhir = totalMasuk - totalKeluar;

  // 2. Query Kegiatan
  let activityQuery = db.select().from(activities).orderBy(desc(activities.createdAt)).limit(5).$dynamic();

  if (filter === "rutin") {
    activityQuery = db.select().from(activities).where(eq(activities.frequency, "rutin")).orderBy(desc(activities.createdAt)).limit(5).$dynamic();
  } else if (filter === "insidental") {
    activityQuery = db.select().from(activities).where(eq(activities.frequency, "insidental")).orderBy(desc(activities.createdAt)).limit(5).$dynamic();
  }

  const [recentActivities, countResult] = await Promise.all([
    activityQuery,
    db.$count(activities),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground text-base mt-2">
            Ahlan wa sahlan, <span className="font-semibold text-primary">{session?.user?.name}</span>.
          </p>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-sm text-muted-foreground font-sans font-medium">{dayjs().format("dddd, D MMMM YYYY")}</p>
        </div>
      </div>

      {/* Statistik Utama */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Saldo Kas Masjid" 
          value={formatRupiah(saldoAkhir)} 
          icon={Wallet} 
          type="primary" 
        />
        <StatCard 
          title="Total Pemasukan" 
          value={formatRupiah(totalMasuk)} 
          icon={ArrowUpRight} 
        />
        <StatCard 
          title="Total Pengeluaran" 
          value={formatRupiah(totalKeluar)} 
          icon={ArrowDownRight} 
        />
        <StatCard 
          title="Total Agenda" 
          value={countResult} 
          icon={CalendarDays} 
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        
        {/* List Agenda Terbaru */}
        <Card className="col-span-4 shadow-sm border-border bg-card flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="font-serif text-xl">Agenda Terbaru</CardTitle>
            <DashboardFilter />
          </CardHeader>
          
          <CardContent className="flex-1">
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((item) => {
                    const isRutin = item.frequency === "rutin";

                    return (
                        <div key={item.id} className="flex items-center group p-3 hover:bg-muted/40 rounded-xl transition-all border border-transparent hover:border-border/50 animate-in fade-in slide-in-from-left-2 duration-300">
                            {/* Icon Tanggal / Rutin */}
                            <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold border flex-shrink-0 ${
                                isRutin 
                                ? "bg-blue-50 text-blue-600 border-blue-100" 
                                : "bg-secondary text-primary border-primary/10"
                            }`}>
                                {isRutin ? (
                                    <>
                                        <Repeat className="w-6 h-6 mb-0.5" />
                                        <span className="text-[9px] uppercase tracking-wider font-sans">Rutin</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-xl font-serif leading-none">{item.date ? dayjs(item.date).format("DD") : "?"}</span>
                                        <span className="text-[10px] uppercase tracking-wider font-sans mt-0.5">{item.date ? dayjs(item.date).format("MMM") : ""}</span>
                                    </>
                                )}
                            </div>

                            {/* Detail Text */}
                            <div className="ml-4 space-y-1 flex-1 min-w-0">
                                <p className="text-base font-bold text-foreground font-sans group-hover:text-primary transition-colors line-clamp-1">
                                    {item.title}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 font-normal bg-white">
                                        {item.category}
                                    </Badge>
                                    <span className="hidden sm:inline text-muted-foreground/40">•</span>
                                    <span className="uppercase tracking-wide">
                                        {isRutin 
                                            ? `Setiap ${item.dayOfWeek}, ${item.time}` 
                                            : (item.date ? dayjs(item.date).format("dddd, HH:mm") : "-")
                                        }
                                    </span>
                                </div>
                            </div>
                            
                            <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors ml-2" />
                        </div>
                    );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                    <div className="p-3 bg-muted rounded-full">
                        <CalendarDays className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {filter === 'rutin' ? 'Tidak ada kegiatan rutin.' : filter === 'insidental' ? 'Tidak ada event mendatang.' : 'Belum ada agenda.'}
                    </p>
                </div>
              )}
            </div>
          </CardContent>

          {/* [UPDATE]: Menggunakan CardFooter agar spacing konsisten */}
          <CardFooter className="p-6 border-t border-border bg-muted/5">
              <Link href="/admin/kegiatan" className="flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors btn-text group">
                Kelola Semua Kegiatan <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
          </CardFooter>
        </Card>

        {/* Quick Actions (Aksi Cepat) */}
        <Card className="col-span-3 shadow-none border-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="font-serif text-xl">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-3">
             {[
               { href: "/admin/kegiatan/tambah", label: "Tambah Kegiatan Baru", desc: "Buat jadwal kajian atau acara", icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
               { href: "/admin/keuangan/tambah", label: "Catat Keuangan", desc: "Input pemasukan/pengeluaran", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
               { href: "/admin/pengaturan", label: "Edit Profil Masjid", desc: "Update info DKM & Fasilitas", icon: Users, color: "text-orange-600", bg: "bg-orange-50" }
             ].map((action, i) => (
               <Link 
                 key={i}
                 href={action.href} 
                 className="w-full bg-card hover:bg-accent/50 border border-border/60 hover:border-primary/30 p-4 rounded-xl flex items-center transition-all duration-200 shadow-sm hover:shadow-md group"
               >
                 <div className={`w-12 h-12 rounded-full ${action.bg} ${action.color} flex items-center justify-center mr-4 transition-colors shrink-0`}>
                    <action.icon className="w-6 h-6" />
                 </div>
                 <div className="flex-1">
                     <span className="font-bold font-sans text-foreground block group-hover:text-primary transition-colors">{action.label}</span>
                     <span className="text-xs text-muted-foreground">{action.desc}</span>
                 </div>
                 <ArrowRight className="ml-2 w-4 h-4 text-muted-foreground/30 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
               </Link>
             ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}