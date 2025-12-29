import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { db } from "@/db";
import { activities, financeRecords } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { CalendarDays, Wallet, ArrowUpRight, ArrowDownRight, Users, ArrowRight } from "lucide-react";
import dayjs from "@/lib/dayjs";
import Link from "next/link";

// Reusable Stat Card dengan Design System Baru
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
      {/* Decorative Background Pattern for Primary Card */}
      {isPrimary && (
        <div className="absolute -right-6 -bottom-6 opacity-10">
          <Icon className="w-32 h-32" />
        </div>
      )}
    </Card>
  );
}

export default async function AdminDashboard() {
  const session = await auth();

  // Queries (Tetap sama seperti sebelumnya)
  const [financeStats] = await db
    .select({
      totalMasuk: sql<number>`sum(case when ${financeRecords.type} = 'pemasukan' then ${financeRecords.amount} else 0 end)`,
      totalKeluar: sql<number>`sum(case when ${financeRecords.type} = 'pengeluaran' then ${financeRecords.amount} else 0 end)`,
    })
    .from(financeRecords);

  const totalMasuk = Number(financeStats?.totalMasuk || 0);
  const totalKeluar = Number(financeStats?.totalKeluar || 0);
  const saldoAkhir = totalMasuk - totalKeluar;

  const [recentActivities, countResult] = await Promise.all([
    db.select().from(activities).orderBy(desc(activities.date)).limit(5),
    db.$count(activities),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header dengan Typography System */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-6">
        <div>
          <h2 className="display-md text-3xl md:text-4xl">Dashboard</h2>
          <p className="lead text-base mt-2">
            Ahlan wa sahlan, <span className="font-semibold text-primary">{session?.user?.name}</span>.
          </p>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-sm text-muted-foreground font-sans">{dayjs().format("dddd, D MMMM YYYY")}</p>
        </div>
      </div>

      {/* Statistik Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Saldo Kas Masjid" 
          value={formatRupiah(saldoAkhir)} 
          icon={Wallet} 
          type="primary" // Card Utama warna Hijau
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
          title="Agenda Terdaftar" 
          value={countResult} 
          icon={CalendarDays} 
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Recent Activities */}
        <Card className="col-span-4 shadow-sm border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Agenda Mendatang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivities.length > 0 ? (
                recentActivities.map((item) => (
                  <div key={item.id} className="flex items-start group p-3 hover:bg-white rounded-xl transition-all duration-200 border border-transparent hover:border-border hover:shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-secondary text-primary flex flex-col items-center justify-center font-bold border border-primary/10 flex-shrink-0">
                      <span className="text-xl font-serif leading-none">{dayjs(item.date).format("DD")}</span>
                      <span className="text-[10px] uppercase tracking-wider font-sans mt-0.5">{dayjs(item.date).format("MMM")}</span>
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-base font-bold text-foreground font-sans group-hover:text-primary transition-colors">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {item.category}
                        </span>
                        <span>• {item.ustadz || "Tim DKM"}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8 italic font-serif">Belum ada agenda.</p>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <Link href="/admin/kegiatan" className="flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors btn-text">
                Lihat Semua Kegiatan <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3 shadow-none border-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="font-serif text-xl">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-3">
             {[
               { href: "/admin/kegiatan/tambah", label: "Tambah Kegiatan Baru", icon: CalendarDays },
               { href: "/admin/keuangan/tambah", label: "Input Kas Masuk/Keluar", icon: Wallet },
               { href: "/admin/pengaturan", label: "Edit Profil Masjid", icon: Users }
             ].map((action, i) => (
               <Link 
                 key={i}
                 href={action.href} 
                 className="w-full bg-white hover:bg-secondary border border-border hover:border-primary/30 text-foreground hover:text-primary p-4 rounded-xl flex items-center transition-all duration-200 shadow-sm group"
               >
                 <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-white text-slate-500 group-hover:text-primary flex items-center justify-center mr-4 transition-colors">
                    <action.icon className="w-5 h-5" />
                 </div>
                 <span className="font-semibold font-sans">{action.label}</span>
                 <ArrowRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
               </Link>
             ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}