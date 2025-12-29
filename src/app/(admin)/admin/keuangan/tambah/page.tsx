import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { createFinanceRecord } from "@/app/actions/keuangan-actions";
import { SubmitButton } from "@/components/ui/submit-button";

export const metadata = { title: "Catat Keuangan Baru" };

export default function TambahKeuanganPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-xl border-border hover:bg-secondary hover:text-primary h-10 w-10" asChild>
          <Link href="/admin/keuangan"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <div>
           <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Catat Transaksi</h2>
           <p className="text-muted-foreground text-sm font-sans mt-1">Input pemasukan atau pengeluaran kas masjid.</p>
        </div>
      </div>

      <form 
        action={async (formData) => {
          "use server";
          await createFinanceRecord(formData);
        }} 
        className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm space-y-8"
      >
        {/* Section 1 */}
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Judul Transaksi <span className="text-destructive">*</span></Label>
                <Input id="title" name="title" placeholder="Contoh: Infaq Jumat, Beli Lampu" required className="h-12 text-lg font-medium border-border focus:ring-primary/20 rounded-xl px-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nominal (Rp) <span className="text-destructive">*</span></Label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">Rp</span>
                        <Input id="amount" name="amount" type="number" placeholder="0" min="0" required className="pl-12 h-12 text-lg font-mono font-bold border-border rounded-xl px-4" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tanggal <span className="text-destructive">*</span></Label>
                    <Input id="date" name="date" type="datetime-local" required className="h-12 border-border rounded-xl px-4" />
                </div>
            </div>
        </div>

        <div className="h-px bg-border/50" />

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Jenis Transaksi <span className="text-destructive">*</span></Label>
            <Select name="type" required>
              <SelectTrigger className="h-12 border-border rounded-xl px-4">
                <SelectValue placeholder="Pilih Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pemasukan" className="text-emerald-600 font-bold">Pemasukan (Masuk Kas)</SelectItem>
                <SelectItem value="pengeluaran" className="text-red-600 font-bold">Pengeluaran (Keluar Kas)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori</Label>
            <Select name="category" required>
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
          <Textarea id="description" name="description" placeholder="Catatan detail..." rows={4} className="border-border rounded-xl resize-none p-4 leading-relaxed" />
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-border">
          <Button variant="ghost" className="rounded-xl h-12 px-6 text-muted-foreground hover:text-foreground" asChild>
            <Link href="/admin/keuangan">Batal</Link>
          </Button>
          <SubmitButton className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-8 font-bold tracking-wide shadow-lg shadow-primary/20">
            <Save className="w-5 h-5 mr-2" /> Simpan Transaksi
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}