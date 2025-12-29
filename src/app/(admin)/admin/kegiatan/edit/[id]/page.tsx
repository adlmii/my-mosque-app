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
import { SubmitButton } from "@/components/ui/submit-button";

export const metadata = {
  title: "Edit Kegiatan",
};

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditKegiatanPage({ params }: Props) {
  const resolvedParams = await params;
  const activityId = parseInt(resolvedParams.id);
  
  if (isNaN(activityId)) redirect("/admin/kegiatan");

  const result = await db.select().from(activities).where(eq(activities.id, activityId)).limit(1);
  const data = result[0];

  if (!data) redirect("/admin/kegiatan");

  const formattedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm");

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-xl border-border hover:bg-secondary hover:text-primary h-10 w-10" asChild>
          <Link href="/admin/kegiatan">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
           <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Edit Informasi</h2>
           <p className="text-muted-foreground text-sm font-sans mt-1">Perbarui detail agenda kegiatan.</p>
        </div>
      </div>

      <form 
        action={async (formData) => {
          "use server";
          await updateActivity(formData);
        }} 
        className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm space-y-8"
      >
        <input type="hidden" name="id" value={data.id} />

        <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Judul Kegiatan</Label>
              <Input id="title" name="title" defaultValue={data.title} required className="h-12 text-lg font-medium border-border focus:ring-primary/20 rounded-xl px-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori</Label>
                <Select name="category" defaultValue={data.category} required>
                  <SelectTrigger className="w-full h-12 border-border rounded-xl px-4">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kajian">Kajian & Dakwah</SelectItem>
                    <SelectItem value="Sosial">Sosial & Kemanusiaan</SelectItem>
                    <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                    <SelectItem value="Ibadah">Ibadah Raya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Waktu Pelaksanaan</Label>
                <Input 
                  id="date" 
                  name="date" 
                  type="datetime-local" 
                  defaultValue={formattedDate} 
                  required 
                  className="h-12 border-border rounded-xl px-4" 
                />
              </div>
            </div>
        </div>

        <div className="h-px bg-border/50" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="ustadz" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Penceramah / PJ</Label>
            <Input id="ustadz" name="ustadz" defaultValue={data.ustadz || ""} className="h-12 border-border rounded-xl px-4" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lokasi</Label>
            <Input id="location" name="location" defaultValue={data.location || ""} className="h-12 border-border rounded-xl px-4" />
          </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Link Gambar (URL)</Label>
            <Input id="imageUrl" name="imageUrl" defaultValue={data.imageUrl || ""} className="h-12 border-border rounded-xl px-4 font-mono text-sm" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Deskripsi Singkat</Label>
          <Textarea 
            id="description" 
            name="description" 
            rows={5} 
            defaultValue={data.description || ""} 
            className="border-border rounded-xl resize-none p-4 leading-relaxed" 
          />
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-border">
          <Button variant="ghost" className="rounded-xl h-12 px-6 text-muted-foreground hover:text-foreground" asChild>
            <Link href="/admin/kegiatan">Batal</Link>
          </Button>
          <SubmitButton className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-8 font-bold tracking-wide shadow-lg shadow-primary/20">
            <Save className="w-5 h-5 mr-2" /> Simpan Perubahan
          </SubmitButton>
        </div>

      </form>
    </div>
  );
}