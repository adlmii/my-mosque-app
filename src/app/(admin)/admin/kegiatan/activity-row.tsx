"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import dayjs from "@/lib/dayjs";
import { deleteActivity } from "@/app/actions/kegiatan-actions";

export function ActivityRow({ item, index }: { item: any; index: number }) {
  const router = useRouter();

  return (
    <TableRow 
      className="cursor-pointer hover:bg-secondary/30 transition-colors group border-b border-border/60"
      onClick={() => router.push(`/admin/kegiatan/edit/${item.id}`)}
    >
      <TableCell className="font-medium text-muted-foreground w-[50px] font-sans text-center">
        {index + 1}
      </TableCell>
      
      <TableCell>
        <p className="font-bold text-foreground text-base font-sans group-hover:text-primary transition-colors">
          {item.title}
        </p>
        <div className="flex items-center gap-3 mt-1.5">
          <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold shadow-none">
            {item.category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground font-medium">
             <MapPin className="w-3 h-3 mr-1 opacity-70"/> {item.location}
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
          <Calendar className="w-4 h-4 text-primary" />
          {dayjs(item.date).format("D MMM YYYY, HH:mm")}
        </div>
      </TableCell>
      
      <TableCell className="text-right">
        <div onClick={(e) => e.stopPropagation()} className="inline-block">
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
              size="sm" 
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full w-8 h-8 p-0"
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