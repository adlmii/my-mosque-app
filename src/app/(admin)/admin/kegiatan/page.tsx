import Link from "next/link";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Plus, Calendar } from "lucide-react";
import { ActivityRow } from "./activity-row"; 

export const metadata = {
  title: "Kelola Kegiatan",
};

export const dynamic = "force-dynamic";

export default async function AdminKegiatanPage() {
  const data = await db.select().from(activities).orderBy(desc(activities.date));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* === HEADER === */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="display-md text-3xl md:text-4xl">Kelola Kegiatan</h2>
          <p className="lead text-base mt-2">
            Daftar agenda kegiatan masjid yang akan datang dan terlaksana.
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-6 font-bold tracking-wide shadow-lg shadow-primary/20 transition-all">
          <Link href="/admin/kegiatan/tambah">
            <Plus className="w-5 h-5 mr-2" /> Tambah Kegiatan
          </Link>
        </Button>
      </div>

      {/* === TABEL DATA === */}
      <div className="border border-border rounded-2xl bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/40 border-b border-border/60">
              <TableHead className="w-[60px] text-center font-bold text-muted-foreground uppercase tracking-wider text-xs py-4">No</TableHead>
              <TableHead className="font-bold text-muted-foreground uppercase tracking-wider text-xs py-4">Nama Kegiatan</TableHead>
              <TableHead className="font-bold text-muted-foreground uppercase tracking-wider text-xs py-4">Jadwal</TableHead>
              <TableHead className="text-right font-bold text-muted-foreground uppercase tracking-wider text-xs py-4 pr-6">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, i) => (
                <ActivityRow key={item.id} item={item} index={i} />
              ))
            ) : (
              // Empty State
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center text-primary mb-2">
                        <Calendar className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-serif font-medium text-foreground">Belum ada kegiatan.</p>
                    <p className="text-sm text-muted-foreground">Silakan buat agenda baru untuk ditampilkan.</p>
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