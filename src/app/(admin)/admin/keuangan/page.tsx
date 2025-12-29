import Link from "next/link";
import { db } from "@/db";
import { financeRecords } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Plus, Wallet, TrendingUp, TrendingDown, ListFilter } from "lucide-react";
import { FinanceRow } from "./finance-row";
import { formatRupiah } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Laporan Keuangan" };
export const dynamic = "force-dynamic";

export default async function AdminKeuanganPage() {
  const data = await db.select().from(financeRecords).orderBy(desc(financeRecords.date));

  const [summary] = await db
    .select({
      totalMasuk: sql<number>`sum(case when ${financeRecords.type} = 'pemasukan' then ${financeRecords.amount} else 0 end)`,
      totalKeluar: sql<number>`sum(case when ${financeRecords.type} = 'pengeluaran' then ${financeRecords.amount} else 0 end)`,
    })
    .from(financeRecords);

  const totalMasuk = Number(summary?.totalMasuk || 0);
  const totalKeluar = Number(summary?.totalKeluar || 0);
  const saldo = totalMasuk - totalKeluar;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* === HEADER === */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">Laporan Keuangan</h2>
          <p className="text-muted-foreground">
            Rekapitulasi pemasukan dan pengeluaran kas masjid secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10 border-border bg-background text-muted-foreground hover:text-foreground">
                <ListFilter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button asChild className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/10 transition-all">
              <Link href="/admin/keuangan/tambah">
                <Plus className="w-4 h-4 mr-2" /> Catat Transaksi
              </Link>
            </Button>
        </div>
      </div>

      {/* === SUMMARY CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Saldo Kas */}
        <Card className="bg-primary border-none shadow-md text-primary-foreground relative overflow-hidden group">
            <Wallet className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform" />
            <CardContent className="p-6 relative z-10">
                <p className="text-white text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Saldo Kas Saat Ini</p>
                <p className="text-white text-3xl font-serif font-bold">{formatRupiah(saldo)}</p>
            </CardContent>
        </Card>
        
        {/* Pemasukan */}
        <Card className="shadow-sm border border-border/60 bg-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Pemasukan</p>
              <p className="text-2xl font-serif font-bold text-emerald-600">{formatRupiah(totalMasuk)}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                <TrendingUp className="w-5 h-5"/>
            </div>
          </CardContent>
        </Card>

        {/* Pengeluaran */}
        <Card className="shadow-sm border border-border/60 bg-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Pengeluaran</p>
              <p className="text-2xl font-serif font-bold text-red-600">{formatRupiah(totalKeluar)}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl text-red-600">
                <TrendingDown className="w-5 h-5"/>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* === TABEL DATA === */}
      <div className="border border-border/60 rounded-xl bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40 border-b border-border/60">
              <TableHead className="w-[60px] text-center h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider">No</TableHead>
              <TableHead className="h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Keterangan & Kategori</TableHead>
              <TableHead className="h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider w-[180px]">Tanggal</TableHead>
              <TableHead className="h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider w-[120px]">Jenis</TableHead>
              <TableHead className="text-right h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider w-[180px]">Nominal</TableHead>
              <TableHead className="text-right h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider pr-6 w-[80px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, i) => (
                <FinanceRow key={item.id} item={item} index={i} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-[300px] text-center">
                   <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center text-muted-foreground/50 mb-2">
                        <Wallet className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-foreground">Belum ada data keuangan</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Catat transaksi pertama Anda untuk mulai mengelola kas.</p>
                    </div>
                   </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}