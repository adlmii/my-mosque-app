import Link from "next/link";
import { db } from "@/db";
import { financeRecords } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Plus, Wallet, TrendingUp, TrendingDown } from "lucide-react";
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
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER & BUTTON */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="display-md text-3xl md:text-4xl">Laporan Keuangan</h2>
          <p className="lead text-base mt-2">Rekapitulasi pemasukan dan pengeluaran kas masjid.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-6 font-bold tracking-wide shadow-lg shadow-primary/20 transition-all">
          <Link href="/admin/keuangan/tambah">
            <Plus className="w-5 h-5 mr-2" /> Catat Transaksi
          </Link>
        </Button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Saldo Kas */}
        <Card className="bg-gradient-to-br from-primary to-emerald-900 border-none shadow-lg text-white relative overflow-hidden">
            {/* Dekorasi Background */}
            <Wallet className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10" />
            
            <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
                <div className="p-3 bg-white/10 w-fit rounded-xl backdrop-blur-sm mb-4">
                    <Wallet className="w-6 h-6 text-white"/>
                </div>
                <div>
                    <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">Saldo Kas Saat Ini</p>
                    <p className="text-3xl md:text-4xl font-serif font-bold text-white">{formatRupiah(saldo)}</p>
                </div>
            </CardContent>
        </Card>
        
        {/* Pemasukan */}
        <Card className="shadow-sm border border-border bg-card">
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Total Pemasukan</p>
              <p className="text-2xl font-serif font-bold text-emerald-600">{formatRupiah(totalMasuk)}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                <TrendingUp className="w-6 h-6"/>
            </div>
          </CardContent>
        </Card>

        {/* Pengeluaran */}
        <Card className="shadow-sm border border-border bg-card">
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Total Pengeluaran</p>
              <p className="text-2xl font-serif font-bold text-red-600">{formatRupiah(totalKeluar)}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl text-red-600">
                <TrendingDown className="w-6 h-6"/>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TABEL DATA */}
      <div className="border border-border rounded-2xl bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/40 border-b border-border/60">
              <TableHead className="w-[60px] text-center font-bold text-muted-foreground uppercase tracking-wider text-xs py-4">No</TableHead>
              <TableHead className="font-bold text-muted-foreground uppercase tracking-wider text-xs py-4">Keterangan</TableHead>
              <TableHead className="font-bold text-muted-foreground uppercase tracking-wider text-xs py-4">Tanggal</TableHead>
              <TableHead className="font-bold text-muted-foreground uppercase tracking-wider text-xs py-4">Jenis</TableHead>
              <TableHead className="text-right font-bold text-muted-foreground uppercase tracking-wider text-xs py-4">Nominal</TableHead>
              <TableHead className="text-right font-bold text-muted-foreground uppercase tracking-wider text-xs py-4 pr-6">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, i) => (
                <FinanceRow key={item.id} item={item} index={i} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center">
                   <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center text-primary mb-2">
                        <Wallet className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-serif font-medium text-foreground">Belum ada data keuangan.</p>
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