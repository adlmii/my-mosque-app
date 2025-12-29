"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trash2, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import dayjs from "@/lib/dayjs";
import { deleteActivity } from "@/app/actions/kegiatan-actions";

export function ActivityRow({ item, index }: { item: any; index: number }) {
  const router = useRouter();

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50 transition-colors group border-b border-border/50"
      onClick={() => router.push(`/admin/kegiatan/edit/${item.id}`)}
    >
      <TableCell className="font-medium text-muted-foreground w-[60px] text-center">
        {index + 1}
      </TableCell>
      
      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-foreground text-base group-hover:text-primary transition-colors line-clamp-1">
            {item.title}
          </span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
             <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary/70"/> 
                <span className="line-clamp-1 max-w-[200px]">{item.location}</span>
             </div>
             <span>•</span>
             <Badge variant="outline" className="rounded-md px-2 py-0 text-[10px] uppercase tracking-wider font-bold border-border/60 text-muted-foreground bg-background/50">
              {item.category}
            </Badge>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/80 bg-secondary/30 w-fit px-3 py-1.5 rounded-lg border border-secondary">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="whitespace-nowrap">
            {dayjs(item.date).format("D MMM YYYY, HH:mm")}
          </span>
        </div>
      </TableCell>
      
      <TableCell className="text-right pr-6">
        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
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