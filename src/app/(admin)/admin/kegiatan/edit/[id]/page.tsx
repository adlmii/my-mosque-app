import Link from "next/link";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { updateActivity } from "@/app/actions/kegiatan-actions";
import { redirect } from "next/navigation";
import dayjs from "@/lib/dayjs";

export const metadata = {
  title: "Edit Kegiatan",
};

export default async function EditKegiatanPage({ params }: { params: { id: string } }) {
  // 1. Ambil Data Lama berdasarkan ID dari URL
  const activityId = parseInt(params.id);
  
  if (isNaN(activityId)) {
    redirect("/admin/kegiatan");
  }

  const result = await db.select().from(activities).where(eq(activities.id, activityId)).limit(1);
  const data = result[0];

  // Kalau data gak ketemu (misal id ngasal), tendang balik
  if (!data) {
    redirect("/admin/kegiatan");
  }

  // Helper: Format tanggal untuk input datetime-local (YYYY-MM-DDTHH:mm)
  const formattedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/kegiatan">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
           <h2 className="text-2xl font-bold tracking-tight text-gray-900">Edit Kegiatan</h2>
           <p className="text-gray-500 text-sm">Perbarui informasi kegiatan masjid.</p>
        </div>
      </div>

      <form 
        action={async (formData) => {
          "use server";
          await updateActivity(formData);
        }} 
        className="space-y-6 bg-white p-6 rounded-lg border shadow-sm"
      >
        {/* PENTING: Input Hidden untuk menyimpan ID agar Action tahu mana yang diedit */}
        <input type="hidden" name="id" value={data.id} />

        {/* Judul */}
        <div className="space-y-2">
          <Label htmlFor="title">Judul Kegiatan</Label>
          <Input id="title" name="title" defaultValue={data.title} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kategori (Default Value pakai defaultValue dari DB) */}
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select name="category" defaultValue={data.category} required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kajian">Kajian</SelectItem>
                <SelectItem value="Sosial">Sosial</SelectItem>
                <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                <SelectItem value="Ibadah">Ibadah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tanggal */}
          <div className="space-y-2">
            <Label htmlFor="date">Waktu Pelaksanaan</Label>
            <Input 
              id="date" 
              name="date" 
              type="datetime-local" 
              defaultValue={formattedDate} // Masukkan tanggal lama
              required 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ustadz">Penceramah / PJ</Label>
            <Input id="ustadz" name="ustadz" defaultValue={data.ustadz || ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lokasi</Label>
            <Input id="location" name="location" defaultValue={data.location || ""} />
          </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="imageUrl">Link Gambar (URL)</Label>
            <Input id="imageUrl" name="imageUrl" defaultValue={data.imageUrl || ""} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi Singkat</Label>
          <Textarea 
            id="description" 
            name="description" 
            rows={4} 
            defaultValue={data.description || ""} 
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button variant="ghost" asChild>
            <Link href="/admin/kegiatan">Batal</Link>
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
          </Button>
        </div>

      </form>
    </div>
  );
}