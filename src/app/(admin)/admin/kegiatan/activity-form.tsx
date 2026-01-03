"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Save, ImageIcon, Calendar as CalendarIcon, Clock, Repeat, MapPin, User, Info, FileText, UploadCloud, X, ImagePlus } from "lucide-react";
import { createActivity, updateActivity } from "@/app/actions/kegiatan-actions";
import { SubmitButton } from "@/components/ui/submit-button";
import dayjs from "@/lib/dayjs";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";

interface ActivityFormProps {
  initialData?: any;
}

export default function ActivityForm({ initialData }: ActivityFormProps) {
  const isEdit = !!initialData;
  const [frequency, setFrequency] = useState<"rutin" | "insidental">(
    initialData?.frequency || "insidental"
  );
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : undefined
  );
  const [timeValue, setTimeValue] = useState<string>(
    initialData?.time 
    || (initialData?.date ? dayjs(initialData.date).format("HH:mm") : "18:00")
  );

  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
         // Validasi Tipe File
         if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
            alert("Hanya file gambar (JPG, PNG) yang diperbolehkan.");
            return;
         }
         
         setImagePreview(URL.createObjectURL(file));
         
         if (fileInputRef.current) {
             const dataTransfer = new DataTransfer();
             dataTransfer.items.add(file);
             fileInputRef.current.files = dataTransfer.files;
         }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const combinedDateTime = date && timeValue 
    ? `${format(date, "yyyy-MM-dd")}T${timeValue}`
    : "";

  return (
    <form 
      action={async (formData) => {
        if (frequency === "rutin") formData.set("time", timeValue);
        if (isEdit) await updateActivity(formData);
        else await createActivity(formData);
      }}
      className="pb-12"
    >
      <Card className="border-border/60 shadow-sm overflow-hidden bg-card">
        <CardContent className="p-4 md:p-5 space-y-6">
            
            {isEdit && <input type="hidden" name="id" value={initialData.id} />}
            {frequency === "insidental" && <input type="hidden" name="date" value={combinedDateTime} />}

            {/* === 1. INFORMASI UTAMA === */}
            <div className="rounded-xl border border-border/50 bg-muted/20 p-5 md:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/40">
                    <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                        <Info className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Informasi Dasar</h3>
                </div>

                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-sm font-semibold text-foreground/80">Judul Kegiatan <span className="text-red-500">*</span></Label>
                        <Input 
                        id="title" 
                        name="title" 
                        defaultValue={initialData?.title}
                        placeholder="Contoh: Kajian Rutin Kitab Riyadhus Shalihin" 
                        required 
                        className="h-12 font-medium border-border focus:ring-primary/20 rounded-lg px-4 text-base bg-background transition-all hover:border-primary/50" 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium text-muted-foreground">Kategori</Label>
                            <Select name="category" defaultValue={initialData?.category} required>
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
                            <Label className="text-sm font-medium text-muted-foreground">Jenis Jadwal</Label>
                            <Select 
                                name="frequency" 
                                value={frequency} 
                                onValueChange={(val: "rutin" | "insidental") => setFrequency(val)} 
                                required
                            >
                                <SelectTrigger className="w-full h-11 border-border rounded-lg px-4 bg-background transition-all hover:border-primary/50">
                                <div className="flex items-center gap-2">
                                    {frequency === "rutin" 
                                    ? <BadgeIcon icon={Repeat} color="text-blue-500" bg="bg-blue-500/10" /> 
                                    : <BadgeIcon icon={CalendarIcon} color="text-orange-500" bg="bg-orange-500/10" />
                                    }
                                    <SelectValue placeholder="Pilih Jenis" />
                                </div>
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="insidental">
                                    <span className="font-medium">Sekali Waktu</span> 
                                    <span className="text-xs text-muted-foreground ml-2">(Tanggal Tertentu)</span>
                                </SelectItem>
                                <SelectItem value="rutin">
                                    <span className="font-medium">Rutin</span>
                                    <span className="text-xs text-muted-foreground ml-2">(Mingguan)</span>
                                </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            {/* === 2. PENGATURAN WAKTU === */}
            <div className="rounded-xl border border-border/50 bg-muted/20 p-5 md:p-6 animate-in fade-in slide-in-from-top-2 duration-300 delay-100">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/40">
                    <div className="p-1.5 bg-blue-500/10 rounded-md text-blue-600">
                        <Clock className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Waktu Pelaksanaan</h3>
                </div>

                {frequency === "insidental" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tanggal</Label>
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
                                        <span>Pilih tanggal kegiatan...</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Jam Mulai</Label>
                        <TimePickerInput value={timeValue} onChange={setTimeValue} />
                    </div>
                </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Hari Rutin</Label>
                        <Select name="dayOfWeek" defaultValue={initialData?.dayOfWeek} required>
                            <SelectTrigger className="h-11 border-border rounded-lg bg-background hover:border-primary/50">
                                <SelectValue placeholder="Pilih Hari..." />
                            </SelectTrigger>
                            <SelectContent>
                                {["ahad", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"].map((day) => (
                                <SelectItem key={day} value={day} className="capitalize">
                                    {day === "ahad" ? "Ahad / Minggu" : day}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Jam Mulai</Label>
                        <TimePickerInput value={timeValue} onChange={setTimeValue} />
                    </div>
                </div>
                )}
            </div>

            {/* === 3. DETAIL TAMBAHAN === */}
            <div className="rounded-xl border border-border/50 bg-muted/20 p-5 md:p-6 animate-in fade-in slide-in-from-top-2 duration-300 delay-200">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/40">
                    <div className="p-1.5 bg-orange-500/10 rounded-md text-orange-600">
                        <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Detail Tambahan</h3>
                </div>

                <div className="space-y-6">
                    
                    {/* --- DRAG & DROP AREA --- */}
                    <div className="grid gap-3">
                        <Label className="text-sm font-medium text-muted-foreground">Poster / Banner Kegiatan</Label>
                        
                        {/* Hidden Input File */}
                        <input 
                            type="file" 
                            id="imageFile"
                            name="imageFile"
                            className="hidden" 
                            ref={fileInputRef}
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleFileSelect}
                        />

                        {imagePreview ? (
                            // TAMPILAN JIKA SUDAH ADA GAMBAR (Preview)
                            <div className="relative w-full aspect-video md:aspect-[3/1] rounded-xl border border-border overflow-hidden group bg-background shadow-sm">
                                <Image 
                                    src={imagePreview} 
                                    alt="Preview Upload" 
                                    fill 
                                    className="object-cover transition-transform group-hover:scale-105 duration-700"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                    <Button 
                                        type="button" 
                                        variant="secondary" 
                                        size="sm"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="h-9"
                                    >
                                        <ImagePlus className="w-4 h-4 mr-2" /> Ganti Gambar
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="destructive" 
                                        size="sm" 
                                        onClick={removeImage}
                                        className="h-9"
                                    >
                                        <X className="w-4 h-4 mr-2" /> Hapus
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            // TAMPILAN JIKA BELUM ADA GAMBAR (Drag Area)
                            <label
                                htmlFor="imageFile"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={cn(
                                    "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 gap-3 group",
                                    isDragging 
                                        ? "border-primary bg-primary/5 scale-[0.99]" 
                                        : "border-border/60 bg-background hover:bg-muted/30 hover:border-primary/40"
                                )}
                            >
                                <div className={cn(
                                    "p-4 rounded-full bg-muted transition-transform group-hover:scale-110 duration-300",
                                    isDragging ? "bg-primary/20 text-primary" : "text-muted-foreground"
                                )}>
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-sm font-semibold text-foreground">
                                        {isDragging ? "Lepaskan file di sini" : "Klik untuk upload atau drag & drop"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG atau JPEG (Maks. 2MB)
                                    </p>
                                </div>
                            </label>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="ustadz" className="text-sm font-medium text-muted-foreground">Penceramah / PJ</Label>
                            <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input 
                                id="ustadz" 
                                name="ustadz" 
                                defaultValue={initialData?.ustadz}
                                placeholder="Nama Ustadz..." 
                                className="h-10 border-border rounded-lg pl-9 bg-background" 
                            />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location" className="text-sm font-medium text-muted-foreground">Lokasi</Label>
                            <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input 
                                id="location" 
                                name="location" 
                                defaultValue={initialData?.location || "Masjid Jami' Al-Huda"} 
                                className="h-10 border-border rounded-lg pl-9 bg-background" 
                            />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-sm font-medium text-muted-foreground">Deskripsi Singkat</Label>
                        <Textarea 
                            id="description" 
                            name="description" 
                            defaultValue={initialData?.description}
                            placeholder="Tuliskan detail kegiatan di sini..." 
                            rows={4} 
                            className="border-border rounded-lg resize-none p-3 leading-relaxed bg-background focus:ring-primary/20" 
                        />
                    </div>
                </div>
            </div>

            {/* === FOOTER === */}
            <div className="pt-4 flex justify-end gap-3 border-t border-border mt-4">
                <Button variant="ghost" className="rounded-lg h-10 px-6 text-muted-foreground hover:bg-secondary" asChild>
                    <Link href="/admin/kegiatan">Batal</Link>
                </Button>
                <SubmitButton className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10 px-8 font-semibold shadow-md shadow-primary/20 transition-all">
                    <Save className="w-4 h-4 mr-2" /> 
                    {isEdit ? "Simpan Perubahan" : "Publikasikan Agenda"}
                </SubmitButton>
            </div>
        </CardContent>
      </Card>
    </form>
  );
}

// --- Helper Components ---
function TimePickerInput({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    const [hour24, minute] = value.split(":").map(Number);
    let displayHour = hour24 % 12;
    displayHour = displayHour === 0 ? 12 : displayHour;
    const displayPeriod = hour24 >= 12 ? "PM" : "AM";
    const updateTime = (newH: number, newM: number, newP: string) => {
        let h24 = newH;
        if (newP === "PM" && newH < 12) h24 = newH + 12;
        if (newP === "AM" && newH === 12) h24 = 0;
        const strH = h24.toString().padStart(2, "0");
        const strM = newM.toString().padStart(2, "0");
        onChange(`${strH}:${strM}`);
    };
    return (
        <div className="flex items-center gap-2 p-1 border border-border rounded-lg bg-background w-full h-11 hover:border-primary/50 transition-colors focus-within:ring-2 focus-within:ring-primary/20">
            <Clock className="w-4 h-4 text-muted-foreground ml-2" />
            <Input type="number" min={1} max={12} value={displayHour.toString().padStart(2, "0")} onChange={(e) => { let v = parseInt(e.target.value); if (isNaN(v)) return; if (v > 12) v = 12; if (v < 1) v = 1; updateTime(v, minute, displayPeriod); }} className="w-12 h-8 p-0 text-center border-none shadow-none focus-visible:ring-0 text-base font-semibold appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent" />
            <span className="text-muted-foreground font-bold">:</span>
            <Input type="number" min={0} max={59} value={minute.toString().padStart(2, "0")} onChange={(e) => { let v = parseInt(e.target.value); if (isNaN(v)) return; if (v > 59) v = 59; if (v < 0) v = 0; updateTime(displayHour, v, displayPeriod); }} className="w-12 h-8 p-0 text-center border-none shadow-none focus-visible:ring-0 text-base font-semibold appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent" />
            <div className="flex bg-muted rounded-sm p-0.5 ml-auto mr-1">
                <button type="button" onClick={() => updateTime(displayHour, minute, "AM")} className={cn("px-2 py-1 text-[10px] font-bold rounded-sm transition-all", displayPeriod === "AM" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground")}>AM</button>
                <button type="button" onClick={() => updateTime(displayHour, minute, "PM")} className={cn("px-2 py-1 text-[10px] font-bold rounded-sm transition-all", displayPeriod === "PM" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground")}>PM</button>
            </div>
        </div>
    )
}

function BadgeIcon({ icon: Icon, color, bg }: { icon: any, color: string, bg: string }) {
    return (<div className={`p-1 rounded ${bg} ${color}`}><Icon className="w-3.5 h-3.5" /></div>)
}