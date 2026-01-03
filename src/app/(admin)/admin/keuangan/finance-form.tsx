"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card"; // Import Card
import { Save, Wallet, Banknote, Calendar as CalendarIcon, FileText, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { createFinanceRecord, updateFinanceRecord } from "@/app/actions/keuangan-actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import dayjs from "@/lib/dayjs";

interface FinanceFormProps {
  initialData?: any;
}

export default function FinanceForm({ initialData }: FinanceFormProps) {
  const isEdit = !!initialData;
  
  // State untuk tanggal (biar pakai DatePicker keren kayak kegiatan)
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : new Date()
  );

  // Kita simpan date sebagai string ISO untuk dikirim ke server action
  const dateString = date ? dayjs(date).format("YYYY-MM-DDTHH:mm") : "";

  return (
    <form 
      action={async (formData) => {
        if (isEdit) await updateFinanceRecord(formData);
        else await createFinanceRecord(formData);
      }} 
      className="pb-12"
    >
      {/* Card Utama */}
      <Card className="border-border/60 shadow-sm overflow-hidden bg-card">
        <CardContent className="p-4 md:p-5 space-y-6">
            
            {/* Hidden Inputs */}
            {isEdit && <input type="hidden" name="id" value={initialData.id} />}
            {/* Input Date Hidden (menggantikan input date native) */}
            <input type="hidden" name="date" value={dateString} />

            {/* === BAGIAN 1: DETAIL TRANSAKSI === */}
            <div className="rounded-xl border border-border/50 bg-muted/20 p-5 md:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/40">
                    <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                        <Wallet className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Detail Transaksi</h3>
                </div>

                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-sm font-semibold text-foreground/80">Judul Transaksi <span className="text-red-500">*</span></Label>
                        <Input 
                          id="title" 
                          name="title" 
                          defaultValue={initialData?.title}
                          placeholder="Contoh: Infaq Jumat, Beli Lampu" 
                          required 
                          className="h-12 font-medium border-border focus:ring-primary/20 rounded-lg px-4 text-base bg-background transition-all hover:border-primary/50" 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium text-muted-foreground">Jenis Transaksi</Label>
                            <Select name="type" defaultValue={initialData?.type} required>
                                <SelectTrigger className="w-full h-11 border-border rounded-lg px-4 bg-background">
                                    <SelectValue placeholder="Pilih Jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pemasukan" className="text-emerald-600 font-medium">
                                        <div className="flex items-center gap-2">
                                            <ArrowUpCircle className="w-4 h-4" /> Pemasukan (Masuk Kas)
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="pengeluaran" className="text-red-600 font-medium">
                                        <div className="flex items-center gap-2">
                                            <ArrowDownCircle className="w-4 h-4" /> Pengeluaran (Keluar Kas)
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-sm font-medium text-muted-foreground">Kategori</Label>
                            <Select name="category" defaultValue={initialData?.category} required>
                                <SelectTrigger className="w-full h-11 border-border rounded-lg px-4 bg-background">
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
                </div>
            </div>

            {/* === BAGIAN 2: NOMINAL & TANGGAL === */}
            <div className="rounded-xl border border-border/50 bg-muted/20 p-5 md:p-6 animate-in fade-in slide-in-from-top-2 duration-300 delay-100">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/40">
                    <div className="p-1.5 bg-emerald-500/10 rounded-md text-emerald-600">
                        <Banknote className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Nominal & Waktu</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="amount" className="text-sm font-medium text-muted-foreground">Nominal (Rp)</Label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm pointer-events-none">Rp</span>
                            <Input 
                              id="amount" 
                              name="amount" 
                              type="number" 
                              defaultValue={initialData?.amount}
                              placeholder="0" 
                              min="0" 
                              required 
                              className="pl-12 h-11 text-lg font-mono font-bold border-border rounded-lg bg-background hover:border-primary/50" 
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-sm font-medium text-muted-foreground">Tanggal Transaksi</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full h-11 justify-start text-left font-normal border-border bg-background hover:bg-background hover:border-primary/50",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {date ? (
                                        <span className="text-foreground font-medium">{format(date, "EEEE, d MMMM yyyy", { locale: id })}</span>
                                    ) : (
                                        <span>Pilih tanggal...</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            {/* === BAGIAN 3: KETERANGAN === */}
            <div className="rounded-xl border border-border/50 bg-muted/20 p-5 md:p-6 animate-in fade-in slide-in-from-top-2 duration-300 delay-200">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/40">
                    <div className="p-1.5 bg-orange-500/10 rounded-md text-orange-600">
                        <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Keterangan Tambahan</h3>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description" className="text-sm font-medium text-muted-foreground">Catatan / Deskripsi</Label>
                    <Textarea 
                        id="description" 
                        name="description" 
                        defaultValue={initialData?.description}
                        placeholder="Tuliskan detail transaksi di sini..." 
                        rows={4} 
                        className="border-border rounded-lg resize-none p-3 leading-relaxed bg-background focus:ring-primary/20" 
                    />
                </div>
            </div>

            {/* === FOOTER === */}
            <div className="pt-4 flex justify-end gap-3 border-t border-border mt-4">
                <Button variant="ghost" className="rounded-lg h-10 px-6 text-muted-foreground hover:bg-secondary" asChild>
                    <Link href="/admin/keuangan">Batal</Link>
                </Button>
                <SubmitButton className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10 px-8 font-semibold shadow-md shadow-primary/20 transition-all">
                    <Save className="w-4 h-4 mr-2" /> 
                    {isEdit ? "Simpan Perubahan" : "Simpan Transaksi"}
                </SubmitButton>
            </div>
        </CardContent>
      </Card>
    </form>
  );
}