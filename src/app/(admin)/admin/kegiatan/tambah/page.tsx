import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { createActivity } from "@/app/actions/kegiatan-actions";

export const metadata = {
  title: "Tambah Kegiatan Baru",
};

export default function TambahKegiatanPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/kegiatan">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
           <h2 className="text-2xl font-bold tracking-tight text-gray-900">Tambah Kegiatan Baru</h2>
           <p className="text-gray-500 text-sm">Isi formulir di bawah ini untuk mempublikasikan agenda.</p>
        </div>
      </div>

      {/* PERBAIKAN DI SINI: Bungkus action dengan async function */}
      <form 
        action={async (formData) => {
          "use server";
          await createActivity(formData);
        }} 
        className="space-y-6 bg-white p-6 rounded-lg border shadow-sm"
      >
        
        {/* Judul */}
        <div className="space-y-2">
          <Label htmlFor="title">Judul Kegiatan <span className="text-red-500">*</span></Label>
          <Input id="title" name="title" placeholder="Contoh: Kajian Rutin Malam Jumat" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kategori */}
          <div className="space-y-2">
            <Label htmlFor="category">Kategori <span className="text-red-500">*</span></Label>
            <Select name="category" required>
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

          {/* Tanggal & Waktu */}
          <div className="space-y-2">
            <Label htmlFor="date">Waktu Pelaksanaan <span className="text-red-500">*</span></Label>
            <Input id="date" name="date" type="datetime-local" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ustadz */}
          <div className="space-y-2">
            <Label htmlFor="ustadz">Penceramah / PJ</Label>
            <Input id="ustadz" name="ustadz" placeholder="Nama Ustadz..." />
          </div>

          {/* Lokasi */}
          <div className="space-y-2">
            <Label htmlFor="location">Lokasi</Label>
            <Input id="location" name="location" defaultValue="Masjid Jami' Al-Huda" />
          </div>
        </div>

        {/* Gambar URL */}
        <div className="space-y-2">
            <Label htmlFor="imageUrl">Link Gambar (URL)</Label>
            <Input id="imageUrl" name="imageUrl" placeholder="https://images.unsplash.com/..." />
            <p className="text-xs text-muted-foreground">
              *Sementara gunakan link gambar dari internet (Unsplash/Google). Fitur upload file akan menyusul.
            </p>
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi Singkat</Label>
          <Textarea id="description" name="description" placeholder="Jelaskan detail kegiatan..." rows={4} />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button variant="ghost" asChild>
            <Link href="/admin/kegiatan">Batal</Link>
          </Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
            <Save className="w-4 h-4 mr-2" /> Simpan Kegiatan
          </Button>
        </div>

      </form>
    </div>
  );
}