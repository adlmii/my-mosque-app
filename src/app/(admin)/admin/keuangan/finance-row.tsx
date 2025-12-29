"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import dayjs from "@/lib/dayjs";
import { deleteFinanceRecord } from "@/app/actions/keuangan-actions";
import { formatRupiah } from "@/lib/utils";

interface FinanceRowProps {
  item: any;
  index: number;
}

export function FinanceRow({ item, index }: FinanceRowProps) {
  const router = useRouter();
  const isMasuk = item.type === "pemasukan";

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50 transition-colors group border-b border-border/50"
      onClick={() => router.push(`/admin/keuangan/edit/${item.id}`)}
    >
      <TableCell className="font-medium text-muted-foreground w-[60px] text-center">
        {index + 1}
      </TableCell>
      
      {/* Detail Transaksi */}
      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-foreground text-base group-hover:text-primary transition-colors line-clamp-1">
            {item.title}
          </span>
          <Badge variant="outline" className="w-fit rounded-md px-2 py-0 text-[10px] uppercase tracking-wider font-bold border-border/60 text-muted-foreground bg-background/50">
            {item.category}
          </Badge>
        </div>
      </TableCell>
      
      {/* Tanggal */}
      <TableCell>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 text-primary/60" />
          <span className="whitespace-nowrap">
            {dayjs(item.date).format("D MMM YYYY")}
          </span>
        </div>
      </TableCell>
      
      {/* Tipe Badge */}
      <TableCell>
        <Badge 
          variant="outline" 
          className={`font-bold border-0 px-2 py-1 rounded-lg text-[10px] uppercase tracking-wide shadow-none inline-flex items-center gap-1 ${
            isMasuk ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20" : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
          }`}
        >
          {isMasuk ? (
            <><ArrowUpRight className="w-3 h-3" /> Masuk</>
          ) : (
            <><ArrowDownRight className="w-3 h-3" /> Keluar</>
          )}
        </Badge>
      </TableCell>

      {/* Nominal dengan Font Mono */}
      <TableCell className={`font-mono font-bold text-right whitespace-nowrap text-base ${isMasuk ? "text-emerald-600" : "text-red-600"}`}>
        {isMasuk ? "+ " : "- "}{formatRupiah(item.amount)}
      </TableCell>
      
      {/* Aksi */}
      <TableCell className="text-right pr-6">
        <div onClick={(e) => e.stopPropagation()} className="flex justify-end">
          <form
            action={async () => {
              await deleteFinanceRecord(item.id);
            }}
            onSubmit={(e) => {
              const msg = `Hapus data "${item.title}"?`;
              if (!confirm(msg)) e.preventDefault();
            }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </TableCell>
    </TableRow>
  );
}