"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trash2, Repeat, User } from "lucide-react";
import { useRouter } from "next/navigation";
import dayjs from "@/lib/dayjs";
import { deleteActivity } from "@/app/actions/kegiatan-actions";

export function ActivityRow({ item, index }: { item: any; index: number }) {
  const router = useRouter();
  const isRutin = item.frequency === "rutin";

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50 transition-colors group border-b border-border/50"
      onClick={() => router.push(`/admin/kegiatan/edit/${item.id}`)}
    >
      <TableCell className="font-medium text-muted-foreground w-[50px] text-center">
        {index + 1}
      </TableCell>
      
      {/* === KOLOM 1: DETAIL (Judul, Lokasi, Ustadz) === */}
      <TableCell>
        <div className="flex flex-col gap-1.5">
          <span className="font-semibold text-foreground text-base group-hover:text-primary transition-colors line-clamp-1">
            {item.title}
          </span>
          
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
             {/* Lokasi */}
             <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0"/> 
                <span className="line-clamp-1">{item.location}</span>
             </div>
             
             {/* Ustadz (Opsional, tampil kalau ada) */}
             {item.ustadz && item.ustadz !== "-" && (
                <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary/70 shrink-0"/>
                    <span className="line-clamp-1">{item.ustadz}</span>
                </div>
             )}
          </div>
        </div>
      </TableCell>

      {/* === KOLOM 2: JENIS & KATEGORI (Tengah) === */}
      <TableCell>
        <div className="flex flex-col items-start gap-2">
            {/* Badge Kategori */}
            <Badge variant="outline" className="rounded-md px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold border-border/60 text-muted-foreground bg-background">
                {item.category}
            </Badge>

            {/* Badge Status (Rutin/Event) */}
            <Badge variant="secondary" className={`rounded-md px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold ${
                isRutin 
                ? "bg-blue-50 text-blue-600 border border-blue-100" 
                : "bg-orange-50 text-orange-600 border border-orange-100"
            }`}>
                {isRutin ? (
                    <span className="flex items-center gap-1"><Repeat className="w-3 h-3"/> Rutin</span>
                ) : (
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> Event</span>
                )}
            </Badge>
        </div>
      </TableCell>
      
      {/* === KOLOM 3: WAKTU === */}
      <TableCell>
        {isRutin ? (
            // Jika Rutin
            <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <Repeat className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="capitalize font-semibold text-foreground">Setiap {item.dayOfWeek}</span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
            </div>
        ) : (
            // Jika Event
            <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                    <Calendar className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-foreground">
                        {item.date ? dayjs(item.date).format("D MMM YYYY") : "-"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {item.date ? dayjs(item.date).format("HH:mm") + " WIB" : ""}
                    </span>
                </div>
            </div>
        )}
      </TableCell>
      
      {/* === KOLOM 4: AKSI === */}
      <TableCell className="text-right pr-6">
        <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
          <form
            action={async () => {
               await deleteActivity(item.id);
            }}
            onSubmit={(e) => {
              if (!confirm("Hapus kegiatan ini?")) e.preventDefault();
            }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
              type="submit"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </TableCell>
    </TableRow>
  );
}