import Link from "next/link";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Plus, Calendar, ListFilter } from "lucide-react";
import { ActivityRow } from "./activity-row"; 

export const metadata = {
  title: "Kelola Kegiatan",
};

export const dynamic = "force-dynamic";

export default async function AdminKegiatanPage() {
  const data = await db.select().from(activities).orderBy(desc(activities.date));

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* === HEADER === */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">Agenda Kegiatan</h2>
          <p className="text-muted-foreground">
            Kelola jadwal kajian, acara sosial, dan kegiatan masjid lainnya.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10 border-border bg-background text-muted-foreground hover:text-foreground">
                <ListFilter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button asChild className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/10 transition-all">
            <Link href="/admin/kegiatan/tambah">
                <Plus className="w-4 h-4 mr-2" /> Tambah Baru
            </Link>
            </Button>
        </div>
      </div>

      {/* === TABEL DATA === */}
      <div className="border border-border/60 rounded-xl bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40 border-b border-border/60">
              <TableHead className="w-[60px] text-center h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider">No</TableHead>
              <TableHead className="h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Detail Kegiatan</TableHead>
              <TableHead className="h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider w-[250px]">Waktu Pelaksanaan</TableHead>
              <TableHead className="h-12 text-right font-semibold text-muted-foreground text-xs uppercase tracking-wider pr-6 w-[100px]">Aksi</TableHead>
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
                <TableCell colSpan={4} className="h-[400px] text-center">
                  <div className="flex flex-col items-center justify-center gap-4 max-w-sm mx-auto">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center text-muted-foreground mb-2">
                        <Calendar className="w-8 h-8 opacity-50" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-foreground">Belum ada agenda</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Mulai tambahkan kegiatan masjid agar jamaah dapat melihat jadwal terbaru.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="mt-2 border-dashed border-primary/30 text-primary hover:bg-primary/5">
                        <Link href="/admin/kegiatan/tambah">
                            Buat Kegiatan Pertama
                        </Link>
                    </Button>
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