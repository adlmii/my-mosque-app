import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, ImageIcon } from "lucide-react";
import { createActivity } from "@/app/actions/kegiatan-actions";
import { SubmitButton } from "@/components/ui/submit-button";

export const metadata = {
  title: "Tambah Kegiatan Baru",
};

export default function TambahKegiatanPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header Form */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground" asChild>
          <Link href="/admin/kegiatan">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
           <h2 className="font-serif text-2xl font-bold text-foreground">Buat Agenda Baru</h2>
           <p className="text-muted-foreground text-sm">Isi detail lengkap kegiatan di bawah ini.</p>
        </div>
      </div>

      <form 
        action={async (formData) => {
          "use server";
          await createActivity(formData);
        }} 
        className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm space-y-8"
      >
        
        {/* === KONTEN UTAMA === */}
        <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="label">Judul Kegiatan <span className="text-destructive">*</span></Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Contoh: Kajian Rutin Kitab Riyadhus Shalihin" 
                required 
                className="h-11 font-medium border-border focus:ring-primary/20 rounded-lg px-4 text-base" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="category" className="label">Kategori <span className="text-destructive">*</span></Label>
                <Select name="category" required>
                  <SelectTrigger className="w-full h-11 border-border rounded-lg px-4 bg-background">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kajian">Kajian & Dakwah</SelectItem>
                    <SelectItem value="Sosial">Sosial & Kemanusiaan</SelectItem>
                    <SelectItem value="Pendidikan">Pendidikan (TPA/Madrasah)</SelectItem>
                    <SelectItem value="Ibadah">Ibadah Raya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date" className="label">Waktu Pelaksanaan <span className="text-destructive">*</span></Label>
                <Input 
                    id="date" 
                    name="date" 
                    type="datetime-local" 
                    required 
                    className="h-11 border-border rounded-lg px-4 bg-background w-full" 
                />
              </div>
            </div>
        </div>

        <div className="h-px bg-border/50" />

        {/* === DETAIL INFORMASI === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="ustadz" className="label">Penceramah / PJ</Label>
            <Input id="ustadz" name="ustadz" placeholder="Nama Ustadz atau Penanggung Jawab" className="h-10 border-border rounded-lg px-3 bg-background" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location" className="label">Lokasi</Label>
            <Input id="location" name="location" defaultValue="Masjid Jami' Al-Huda" className="h-10 border-border rounded-lg px-3 bg-background" />
          </div>
        </div>

        <div className="grid gap-2">
            <Label htmlFor="imageUrl" className="label">Link Gambar (URL)</Label>
            <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="imageUrl" name="imageUrl" placeholder="https://..." className="h-10 pl-9 border-border rounded-lg font-mono text-sm bg-background" />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Masukkan URL gambar langsung (akhiran .jpg/.png) untuk ditampilkan sebagai banner.
            </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description" className="label">Deskripsi Singkat</Label>
          <Textarea 
            id="description" 
            name="description" 
            placeholder="Jelaskan detail kegiatan..." 
            rows={4} 
            className="border-border rounded-lg resize-none p-3 leading-relaxed bg-background focus:ring-primary/20" 
          />
        </div>

        {/* === FOOTER ACTIONS === */}
        <div className="pt-6 flex justify-end gap-3 border-t border-border mt-4">
          <Button variant="outline" className="rounded-lg h-10 px-6 border-border text-muted-foreground hover:text-foreground hover:bg-secondary" asChild>
            <Link href="/admin/kegiatan">Batal</Link>
          </Button>
          <SubmitButton className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10 px-8 font-semibold shadow-md shadow-primary/20 transition-all">
            <Save className="w-4 h-4 mr-2" /> Publikasikan
          </SubmitButton>
        </div>

      </form>
    </div>
  );
}