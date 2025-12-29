import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Wallet } from "lucide-react";
import { createFinanceRecord } from "@/app/actions/keuangan-actions";
import { SubmitButton } from "@/components/ui/submit-button";

export const metadata = { title: "Catat Keuangan Baru" };

export default function TambahKeuanganPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* === HEADER === */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground" asChild>
          <Link href="/admin/keuangan">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
           <h2 className="font-serif text-2xl font-bold text-foreground">Catat Transaksi</h2>
           <p className="text-muted-foreground text-sm">Input pemasukan atau pengeluaran kas masjid secara detail.</p>
        </div>
      </div>

      <form 
        action={async (formData) => {
          "use server";
          await createFinanceRecord(formData);
        }} 
        className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm space-y-8"
      >
        {/* === INFORMASI UTAMA === */}
        <div className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Judul Transaksi <span className="text-destructive">*</span></Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="Contoh: Infaq Jumat, Beli Lampu" 
                  required 
                  className="h-11 font-medium border-border focus:ring-primary/20 rounded-lg px-4 text-base bg-background" 
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nominal (Rp) <span className="text-destructive">*</span></Label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm">Rp</span>
                        <Input 
                          id="amount" 
                          name="amount" 
                          type="number" 
                          placeholder="0" 
                          min="0" 
                          required 
                          className="pl-12 h-11 text-lg font-mono font-bold border-border rounded-lg bg-background" 
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tanggal <span className="text-destructive">*</span></Label>
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

        {/* === KLASIFIKASI === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="type" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Jenis Transaksi <span className="text-destructive">*</span></Label>
            <Select name="type" required>
              <SelectTrigger className="h-11 border-border rounded-lg px-4 bg-background">
                <SelectValue placeholder="Pilih Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pemasukan" className="text-emerald-600 font-bold text-xs uppercase tracking-wide">Pemasukan (Masuk Kas)</SelectItem>
                <SelectItem value="pengeluaran" className="text-red-600 font-bold text-xs uppercase tracking-wide">Pengeluaran (Keluar Kas)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori <span className="text-destructive">*</span></Label>
            <Select name="category" required>
              <SelectTrigger className="h-11 border-border rounded-lg px-4 bg-background">
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

        <div className="grid gap-2">
          <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Keterangan Tambahan</Label>
          <Textarea 
            id="description" 
            name="description" 
            placeholder="Catatan detail mengenai transaksi ini..." 
            rows={4} 
            className="border-border rounded-lg resize-none p-3 leading-relaxed bg-background focus:ring-primary/20" 
          />
        </div>

        {/* === FOOTER ACTIONS === */}
        <div className="pt-6 flex justify-end gap-3 border-t border-border mt-4">
          <Button variant="outline" className="rounded-lg h-10 px-6 border-border text-muted-foreground hover:text-foreground hover:bg-secondary" asChild>
            <Link href="/admin/keuangan">Batal</Link>
          </Button>
          <SubmitButton className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10 px-8 font-semibold shadow-md shadow-primary/20 transition-all">
            <Save className="w-4 h-4 mr-2" /> Simpan Transaksi
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}