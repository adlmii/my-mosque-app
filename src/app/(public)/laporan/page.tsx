import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowUpRight, ArrowDownRight, Wallet, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FadeIn } from "@/components/ui/fade-in";

// --- Database Imports ---
import { db } from "@/db";
import { financeRecords } from "@/db/schema";
import { desc } from "drizzle-orm";
import dayjs from "@/lib/dayjs";
import { formatRupiah } from "@/lib/utils"; 

// Force Dynamic agar data selalu fresh
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Laporan Keuangan",
  description: "Transparansi laporan keuangan infaq dan shodaqoh masjid.",
};

export default async function LaporanPage() {
  // 1. Ambil data transaksi
  const transactions = await db
    .select()
    .from(financeRecords)
    .orderBy(desc(financeRecords.date));

  // 2. Hitung Ringkasan
  let totalPemasukan = 0;
  let totalPengeluaran = 0;

  transactions.forEach((t) => {
    if (t.type === "pemasukan") {
      totalPemasukan += t.amount;
    } else {
      totalPengeluaran += t.amount;
    }
  });

  const saldoAkhir = totalPemasukan - totalPengeluaran;

  return (
    <div className="flex flex-col font-optimized pb-20 relative overflow-hidden min-h-screen">
      
      {/* Background Decorations (Konsisten dengan Profil) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/30 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* === HEADER SECTION === */}
      <section className="bg-gradient-to-br from-secondary/10 via-white to-accent/20 py-16 md:py-24 border-b border-border/60 relative">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <FadeIn>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 bg-white/80 backdrop-blur-sm text-primary">
              Transparansi Umat
            </Badge>
            <h1 className="mb-6 leading-tight">
              Laporan Keuangan
              <span className="block mt-2 text-primary">
                Masjid & DKM
              </span>
            </h1>
            <p className="lead text-balance">
              Wujud pertanggungjawaban kami dalam mengelola amanah infaq dan shodaqoh dari jamaah untuk kemaslahatan umat.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-10 space-y-8">
        
        {/* === RINGKASAN SALDO === */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Kartu Saldo Utama (Highlight) */}
            <Card className="bg-gradient-to-br from-primary via-primary to-emerald-900 text-primary-foreground border-none shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>
              
              <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-emerald-400/20 text-emerald-100 hover:bg-emerald-400/30 border-0">
                    Update: {dayjs().format("D MMM YYYY")}
                  </Badge>
                </div>
                <div>
                  <p className="text-emerald-100 font-medium mb-1">Saldo Kas Saat Ini</p>
                  <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-tight tabular-nums text-white">
                    {formatRupiah(saldoAkhir)}
                  </h3>
                </div>
              </CardContent>
            </Card>

            {/* Kartu Pemasukan */}
            <SummaryCard 
              title="Total Pemasukan"
              amount={totalPemasukan}
              icon={<ArrowUpRight className="w-5 h-5" />}
              type="in"
            />

            {/* Kartu Pengeluaran */}
            <SummaryCard 
              title="Total Pengeluaran"
              amount={totalPengeluaran}
              icon={<ArrowDownRight className="w-5 h-5" />}
              type="out"
            />
          </div>
        </FadeIn>

        {/* === TABEL TRANSAKSI === */}
        <FadeIn delay={0.4}>
          <Card className="border-border/60 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-secondary/10 border-b border-border/60 px-6 py-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                   <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                     <FileText className="w-5 h-5 text-primary" />
                     Mutasi Kas Terbaru
                   </CardTitle>
                   <p className="text-sm text-muted-foreground mt-1">Daftar transaksi masuk dan keluar yang tercatat sistem.</p>
                 </div>
                 {/* Filter Bulan (Visual Saja) */}
                 <Badge variant="outline" className="px-3 py-1 bg-white border-border gap-2 text-sm font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    Bulan Ini
                 </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-secondary/5 border-border/60">
                    <TableHead className="w-[180px] font-bold text-muted-foreground pl-6">Tanggal</TableHead>
                    <TableHead className="font-bold text-muted-foreground">Keterangan Transaksi</TableHead>
                    <TableHead className="font-bold text-muted-foreground">Kategori</TableHead>
                    <TableHead className="text-right font-bold text-muted-foreground pr-6">Nominal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length > 0 ? (
                    transactions.map((item) => (
                      <TableRow key={item.id} className="hover:bg-secondary/5 transition-colors border-border/40 group">
                        
                        {/* Tanggal */}
                        <TableCell className="pl-6 py-4 align-top">
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{dayjs(item.date).format("D MMM YYYY")}</span>
                            <span className="text-xs text-muted-foreground">{dayjs(item.date).format("HH:mm")} WIB</span>
                          </div>
                        </TableCell>
                        
                        {/* Keterangan */}
                        <TableCell className="py-4 align-top">
                          <span className="block font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </span>
                          {item.description && (
                            <span className="text-sm text-muted-foreground line-clamp-1">{item.description}</span>
                          )}
                        </TableCell>
                        
                        {/* Kategori */}
                        <TableCell className="py-4 align-top">
                           <Badge variant="secondary" className="font-medium bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 border-0">
                             {item.category}
                           </Badge>
                        </TableCell>
                        
                        {/* Nominal */}
                        <TableCell className={`pr-6 py-4 text-right align-top font-bold font-sans tabular-nums ${
                          item.type === 'pemasukan' ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {item.type === 'pemasukan' ? '+ ' : '- '}
                          {formatRupiah(item.amount)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
                           <FileText className="w-8 h-8 opacity-20" />
                           <p>Belum ada data transaksi bulan ini.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            
            <div className="p-4 bg-secondary/5 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                Laporan ini dibuat secara otomatis oleh sistem database DKM.
              </p>
            </div>
          </Card>
        </FadeIn>

      </div>
    </div>
  );
}

// --- Komponen Kecil untuk Kartu Ringkasan ---
function SummaryCard({ title, amount, icon, type }: { title: string, amount: number, icon: React.ReactNode, type: 'in' | 'out' }) {
  const isIncome = type === 'in';
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-border shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2.5 rounded-lg ${isIncome ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
            {icon}
          </div>
          <div className={`text-xs font-bold px-2 py-1 rounded-full ${isIncome ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {isIncome ? 'Pemasukan' : 'Pengeluaran'}
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
          <p className={`text-2xl font-bold font-sans tabular-nums tracking-tight ${isIncome ? 'text-emerald-700' : 'text-red-700'}`}>
            {formatRupiah(amount)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}