import Link from "next/link";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, ImageIcon } from "lucide-react";
import { updateActivity } from "@/app/actions/kegiatan-actions";
import { redirect } from "next/navigation";
import dayjs from "@/lib/dayjs";
import { SubmitButton } from "@/components/ui/submit-button";

export const metadata = {
  title: "Edit Kegiatan",
};

// Definisikan tipe Props untuk Next.js 15
type Props = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic";

export default async function EditKegiatanPage({ params }: Props) {
  const resolvedParams = await params;
  const activityId = parseInt(resolvedParams.id);
  
  if (isNaN(activityId)) {
    redirect("/admin/kegiatan");
  }

  const result = await db.select().from(activities).where(eq(activities.id, activityId)).limit(1);
  const data = result[0];

  if (!data) {
    redirect("/admin/kegiatan");
  }

  // Format tanggal agar sesuai dengan input type="datetime-local"
  const formattedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm");

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* === HEADER === */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground" asChild>
          <Link href="/admin/kegiatan">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
           <h2 className="font-serif text-2xl font-bold text-foreground">Edit Kegiatan</h2>
           <p className="text-muted-foreground text-sm">Perbarui informasi detail kegiatan masjid.</p>
        </div>
      </div>

      <form 
        action={async (formData) => {
          "use server";
          await updateActivity(formData);
        }} 
        className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm space-y-8"
      >
        <input type="hidden" name="id" value={data.id} />

        {/* === KONTEN UTAMA === */}
        <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="label">Judul Kegiatan <span className="text-destructive">*</span></Label>
              <Input 
                id="title" 
                name="title" 
                defaultValue={data.title} 
                required 
                className="h-11 font-medium border-border focus:ring-primary/20 rounded-lg px-4 text-base bg-background" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="category" className="label">Kategori <span className="text-destructive">*</span></Label>
                <Select name="category" defaultValue={data.category} required>
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
                  defaultValue={formattedDate} 
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
            <Input 
                id="ustadz" 
                name="ustadz" 
                defaultValue={data.ustadz || ""} 
                placeholder="Nama Ustadz..."
                className="h-10 border-border rounded-lg px-3 bg-background" 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location" className="label">Lokasi</Label>
            <Input 
                id="location" 
                name="location" 
                defaultValue={data.location || ""} 
                className="h-10 border-border rounded-lg px-3 bg-background" 
            />
          </div>
        </div>

        <div className="grid gap-2">
            <Label htmlFor="imageUrl" className="label">Link Gambar (URL)</Label>
            <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                    id="imageUrl" 
                    name="imageUrl" 
                    defaultValue={data.imageUrl || ""} 
                    placeholder="https://..." 
                    className="h-10 pl-9 border-border rounded-lg font-mono text-sm bg-background" 
                />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Pastikan link gambar valid (akhiran .jpg/.png). Kosongkan jika tidak ada perubahan.
            </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description" className="label">Deskripsi Singkat</Label>
          <Textarea 
            id="description" 
            name="description" 
            rows={4} 
            defaultValue={data.description || ""} 
            className="border-border rounded-lg resize-none p-3 leading-relaxed bg-background focus:ring-primary/20" 
          />
        </div>

        {/* === FOOTER ACTIONS === */}
        <div className="pt-6 flex justify-end gap-3 border-t border-border mt-4">
          <Button variant="outline" className="rounded-lg h-10 px-6 border-border text-muted-foreground hover:text-foreground hover:bg-secondary" asChild>
            <Link href="/admin/kegiatan">Batal</Link>
          </Button>
          <SubmitButton className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10 px-8 font-semibold shadow-md shadow-primary/20 transition-all">
            <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
          </SubmitButton>
        </div>

      </form>
    </div>
  );
}