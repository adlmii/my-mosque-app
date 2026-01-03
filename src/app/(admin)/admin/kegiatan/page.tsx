import Link from "next/link";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { desc, eq } from "drizzle-orm"; // Tambah eq
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Plus, Calendar, ListFilter } from "lucide-react";
import { ActivityRow } from "./activity-row"; 
import { ActivityFilter } from "./activity-filter"; // Import komponen baru

export const metadata = {
  title: "Kelola Kegiatan",
};

export const dynamic = "force-dynamic";

// Menerima searchParams dari URL
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminKegiatanPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams.filter as string | undefined;

  // Logic Filter Database
  let query = db.select().from(activities).orderBy(desc(activities.createdAt)).$dynamic();

  // Jika ada filter rutin/insidental, tambahkan kondisi where
  if (filter === "rutin") {
    query = db.select().from(activities).where(eq(activities.frequency, "rutin")).orderBy(desc(activities.createdAt)).$dynamic();
  } else if (filter === "insidental") {
    query = db.select().from(activities).where(eq(activities.frequency, "insidental")).orderBy(desc(activities.createdAt)).$dynamic();
  }

  // Eksekusi query
  const data = await query;

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
        <div className="flex items-center gap-3">
            {/* Filter Toggle Disini */}
            <ActivityFilter />

            <Button asChild className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/10 transition-all ml-2">
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
              <TableHead className="w-[50px] text-center h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider">No</TableHead>
              <TableHead className="h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Detail Kegiatan</TableHead>
              <TableHead className="h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider w-[180px]">Jenis & Kategori</TableHead>
              <TableHead className="h-12 font-semibold text-muted-foreground text-xs uppercase tracking-wider w-[250px]">Waktu Pelaksanaan</TableHead>
              <TableHead className="h-12 text-right font-semibold text-muted-foreground text-xs uppercase tracking-wider pr-6 w-[80px]">Aksi</TableHead>
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
                <TableCell colSpan={5} className="h-[400px] text-center">
                  <div className="flex flex-col items-center justify-center gap-4 max-w-sm mx-auto">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center text-muted-foreground mb-2">
                        <Calendar className="w-8 h-8 opacity-50" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-foreground">Tidak ada kegiatan</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {filter === "rutin" 
                                ? "Belum ada kegiatan rutin yang terdaftar." 
                                : filter === "insidental" 
                                    ? "Belum ada event atau kegiatan insidental." 
                                    : "Mulai tambahkan kegiatan masjid agar jamaah dapat melihat jadwal terbaru."
                            }
                        </p>
                    </div>
                    {filter === 'all' && (
                        <Button asChild variant="outline" className="mt-2 border-dashed border-primary/30 text-primary hover:bg-primary/5">
                            <Link href="/admin/kegiatan/tambah">
                                Buat Kegiatan Pertama
                            </Link>
                        </Button>
                    )}
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