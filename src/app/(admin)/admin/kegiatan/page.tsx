import Link from "next/link";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Calendar, MapPin, Pencil } from "lucide-react";
import dayjs from "@/lib/dayjs";
import { deleteActivity } from "@/app/actions/kegiatan-actions";

export const metadata = {
  title: "Kelola Kegiatan",
};

// Force dynamic agar data selalu fresh saat dibuka
export const dynamic = "force-dynamic";

export default async function AdminKegiatanPage() {
  // 1. Ambil data dari Database (Urutkan dari yang paling baru)
  const data = await db.select().from(activities).orderBy(desc(activities.date));

  return (
    <div className="space-y-6">
      
      {/* === HEADER & TOMBOL TAMBAH === */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Kelola Kegiatan</h2>
          <p className="text-gray-500">Daftar agenda kegiatan masjid yang akan datang dan terlaksana.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/admin/kegiatan/tambah">
            <Plus className="w-4 h-4 mr-2" /> Tambah Kegiatan
          </Link>
        </Button>
      </div>

      {/* === TABEL DATA === */}
      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[50px]">No</TableHead>
              <TableHead>Nama Kegiatan</TableHead>
              <TableHead>Jadwal</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, i) => (
                <TableRow key={item.id}>
                  {/* Nomor Urut */}
                  <TableCell className="font-medium text-gray-500">{i + 1}</TableCell>
                  
                  {/* Judul & Detail Lokasi */}
                  <TableCell>
                    <p className="font-bold text-gray-900">{item.title}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span className="flex items-center"><MapPin className="w-3 h-3 mr-1"/> {item.location}</span>
                      <span>• {item.ustadz}</span>
                    </div>
                  </TableCell>
                  
                  {/* Tanggal */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {dayjs(item.date).format("D MMM YYYY, HH:mm")}
                    </div>
                  </TableCell>
                  
                  {/* Kategori Badge */}
                  <TableCell>
                    <Badge variant="outline" className="font-normal bg-slate-50">
                      {item.category}
                    </Badge>
                  </TableCell>
                  
                  {/* Tombol Aksi (Edit & Hapus) */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      
                      {/* 1. Tombol EDIT (Link ke halaman edit) */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Link href={`/admin/kegiatan/edit/${item.id}`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>

                      {/* 2. Tombol HAPUS (Server Action) */}
                      {/* Menggunakan inline async wrapper agar TypeScript tidak error */}
                      <form
                        action={async () => {
                          "use server";
                          await deleteActivity(item.id);
                        }}
                      >
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          type="submit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>

                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Empty State (Jika tidak ada data)
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Calendar className="w-8 h-8 opacity-20" />
                    <p>Belum ada kegiatan. Silakan tambah baru.</p>
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