import Link from "next/link";
import { db } from "@/db";
import { financeRecords } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { updateFinanceRecord } from "@/app/actions/keuangan-actions";
import { redirect } from "next/navigation";
import dayjs from "@/lib/dayjs";
import { SubmitButton } from "@/components/ui/submit-button";

export const metadata = { title: "Edit Keuangan" };

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditKeuanganPage({ params }: Props) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  
  if (isNaN(id)) redirect("/admin/keuangan");

  const result = await db.select().from(financeRecords).where(eq(financeRecords.id, id)).limit(1);
  const data = result[0];

  if (!data) redirect("/admin/keuangan");

  const formattedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm");

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-xl border-border hover:bg-secondary hover:text-primary h-10 w-10" asChild>
          <Link href="/admin/keuangan"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <div>
           <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Edit Transaksi</h2>
           <p className="text-muted-foreground text-sm font-sans mt-1">Perbarui data pemasukan atau pengeluaran.</p>
        </div>
      </div>

      <form 
        action={async (formData) => {
          "use server";
          await updateFinanceRecord(formData);
        }} 
        className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm space-y-8"
      >
        <input type="hidden" name="id" value={data.id} />

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Judul Transaksi</Label>
            <Input id="title" name="title" defaultValue={data.title} required className="h-12 text-lg font-medium border-border focus:ring-primary/20 rounded-xl px-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nominal (Rp)</Label>
              <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">Rp</span>
                  <Input id="amount" name="amount" type="number" defaultValue={data.amount} required className="pl-12 h-12 text-lg font-mono font-bold border-border rounded-xl px-4" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tanggal</Label>
              <Input id="date" name="date" type="datetime-local" defaultValue={formattedDate} required className="h-12 border-border rounded-xl px-4" />
            </div>
          </div>
        </div>

        <div className="h-px bg-border/50" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Jenis Transaksi</Label>
            <Select name="type" defaultValue={data.type} required>
              <SelectTrigger className="h-12 border-border rounded-xl px-4">
                <SelectValue placeholder="Pilih Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pemasukan" className="text-emerald-600 font-bold">Pemasukan</SelectItem>
                <SelectItem value="pengeluaran" className="text-red-600 font-bold">Pengeluaran</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori</Label>
            <Select name="category" defaultValue={data.category || "Lainnya"} required>
              <SelectTrigger className="h-12 border-border rounded-xl px-4">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Infaq Jumat">Infaq Jumat</SelectItem>
                <SelectItem value="Operasional">Operasional</SelectItem>
                <SelectItem value="Pembangunan">Pembangunan</SelectItem>
                <SelectItem value="Sosial">Sosial / Santunan</SelectItem>
                <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Keterangan Tambahan</Label>
          <Textarea id="description" name="description" defaultValue={data.description || ""} rows={4} className="border-border rounded-xl resize-none p-4 leading-relaxed" />
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-border">
          <Button variant="ghost" className="rounded-xl h-12 px-6 text-muted-foreground hover:text-foreground" asChild>
            <Link href="/admin/keuangan">Batal</Link>
          </Button>
          <SubmitButton className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-8 font-bold tracking-wide shadow-lg shadow-primary/20">
            <Save className="w-5 h-5 mr-2" /> Simpan Perubahan
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}