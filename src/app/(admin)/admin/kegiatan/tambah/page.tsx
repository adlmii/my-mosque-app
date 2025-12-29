import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { createActivity } from "@/app/actions/kegiatan-actions";
import { SubmitButton } from "@/components/ui/submit-button";

export const metadata = {
  title: "Tambah Kegiatan Baru",
};

export default function TambahKegiatanPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-xl border-border hover:bg-secondary hover:text-primary h-10 w-10" asChild>
          <Link href="/admin/kegiatan">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
           <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Buat Agenda Baru</h2>
           <p className="text-muted-foreground text-sm font-sans mt-1">Publikasikan kegiatan untuk jamaah.</p>
        </div>
      </div>

      <form 
        action={async (formData) => {
          "use server";
          await createActivity(formData);
        }} 
        className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm space-y-8"
      >
        
        {/* Section Utama */}
        <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Judul Kegiatan <span className="text-destructive">*</span></Label>
              <Input id="title" name="title" placeholder="Contoh: Kajian Rutin Kitab Riyadhus Shalihin" required className="h-12 text-lg font-medium border-border focus:ring-primary/20 rounded-xl px-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori <span className="text-destructive">*</span></Label>
                <Select name="category" required>
                  <SelectTrigger className="w-full h-12 border-border rounded-xl px-4">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kajian">Kajian & Dakwah</SelectItem>
                    <SelectItem value="Sosial">Sosial & Kemanusiaan</SelectItem>
                    <SelectItem value="Pendidikan">Pendidikan (TPA/Madrasah)</SelectItem>
                    <SelectItem value="Ibadah">Ibadah Raya (Sholat Ied/Taraweh)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Waktu Pelaksanaan <span className="text-destructive">*</span></Label>
                <Input id="date" name="date" type="datetime-local" required className="h-12 border-border rounded-xl px-4" />
              </div>
            </div>
        </div>

        <div className="h-px bg-border/50" />

        {/* Section Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="ustadz" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Penceramah / PJ</Label>
            <Input id="ustadz" name="ustadz" placeholder="Nama Ustadz..." className="h-12 border-border rounded-xl px-4" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lokasi</Label>
            <Input id="location" name="location" defaultValue="Masjid Jami' Al-Huda" className="h-12 border-border rounded-xl px-4" />
          </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Link Gambar (URL)</Label>
            <Input id="imageUrl" name="imageUrl" placeholder="https://..." className="h-12 border-border rounded-xl px-4 font-mono text-sm" />
            <p className="text-[10px] text-muted-foreground italic">
              *Masukkan link gambar langsung (jpg/png) jika ada.
            </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Deskripsi Singkat</Label>
          <Textarea id="description" name="description" placeholder="Jelaskan detail kegiatan..." rows={5} className="border-border rounded-xl resize-none p-4 leading-relaxed" />
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-border">
          <Button variant="ghost" className="rounded-xl h-12 px-6 text-muted-foreground hover:text-foreground" asChild>
            <Link href="/admin/kegiatan">Batal</Link>
          </Button>
          <SubmitButton className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-8 font-bold tracking-wide shadow-lg shadow-primary/20">
            <Save className="w-5 h-5 mr-2" /> Publikasikan
          </SubmitButton>
        </div>

      </form>
    </div>
  );
}