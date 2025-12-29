import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { db } from "@/db";
import { activities, financeRecords } from "@/db/schema";
import { desc } from "drizzle-orm";
import { CalendarDays, Wallet, ArrowUpRight, ArrowDownRight, Users } from "lucide-react";
import dayjs from "@/lib/dayjs";
import Link from "next/link";

export const metadata = {
  title: "Dashboard Admin",
};

export default async function AdminDashboard() {
  const session = await auth();

  // 1. Ambil Data Statistik dari Database
  // --- Keuangan ---
  const allTransactions = await db.select().from(financeRecords);
  let totalMasuk = 0;
  let totalKeluar = 0;
  
  allTransactions.forEach(t => {
    if (t.type === 'pemasukan') totalMasuk += t.amount;
    else totalKeluar += t.amount;
  });
  
  const saldoAkhir = totalMasuk - totalKeluar;

  // --- Kegiatan ---
  const allActivities = await db.select().from(activities).orderBy(desc(activities.date)).limit(5);
  const totalKegiatan = await db.$count(activities); // Fitur count Drizzle

  return (
    <div className="space-y-8">
      
      {/* Header Halaman */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-2">
          Selamat datang kembali, <span className="font-semibold text-emerald-700">{session?.user?.name}</span>! 👋
        </p>
      </div>

      {/* Statistik Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Saldo Kas */}
        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Saldo Kas
            </CardTitle>
            <Wallet className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatRupiah(saldoAkhir)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Update Terkini
            </p>
          </CardContent>
        </Card>

        {/* Pemasukan */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pemasukan (Total)
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{formatRupiah(totalMasuk)}</div>
          </CardContent>
        </Card>

        {/* Pengeluaran */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pengeluaran (Total)
            </CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{formatRupiah(totalKeluar)}</div>
          </CardContent>
        </Card>

        {/* Total Kegiatan */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Agenda Kegiatan
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalKegiatan}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Program terdaftar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity (Kegiatan Terbaru) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Kegiatan Masjid Berikutnya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {allActivities.length > 0 ? (
                allActivities.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                      {dayjs(item.date).format("DD")}
                      <br/>
                      {dayjs(item.date).format("MMM")}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-900">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.category} • {item.ustadz || "Tim DKM"}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-xs text-gray-500">
                      {dayjs(item.date).fromNow()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada kegiatan yang dijadwalkan.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions (Nanti kita hubungkan fungsinya) */}
        <Card className="col-span-3 shadow-sm bg-emerald-900 text-white border-none">
          <CardHeader>
            <CardTitle className="text-white">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <p className="text-emerald-100 text-sm">
               Kelola data masjid dengan mudah melalui menu di bawah ini.
             </p>
             <div className="grid grid-cols-1 gap-2">
                {/* Tombol Kegiatan */}
                <Link href="/admin/kegiatan" className="w-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-3 px-4 rounded-lg flex items-center transition-colors">
                  <CalendarDays className="w-4 h-4 mr-3" /> 
                  Kelola Kegiatan
                </Link>

                {/* Tombol Keuangan */}
                <Link href="/admin/keuangan" className="w-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-3 px-4 rounded-lg flex items-center transition-colors">
                  <Wallet className="w-4 h-4 mr-3" /> 
                  Input Laporan Keuangan
                </Link>

                {/* Tombol Pengaturan */}
                <Link href="/admin/pengaturan" className="w-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-3 px-4 rounded-lg flex items-center transition-colors">
                  <Users className="w-4 h-4 mr-3" /> 
                  Profil Masjid
                </Link>
             </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}