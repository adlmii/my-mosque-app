"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";
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
      className="cursor-pointer hover:bg-secondary/30 transition-colors group border-b border-border/60"
      onClick={() => router.push(`/admin/keuangan/edit/${item.id}`)}
    >
      <TableCell className="font-medium text-muted-foreground w-[60px] font-sans text-center">
        {index + 1}
      </TableCell>
      
      {/* Judul & Kategori */}
      <TableCell>
        <p className="font-bold text-foreground text-base font-sans group-hover:text-primary transition-colors">
          {item.title}
        </p>
        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-secondary/50 border border-border px-2 py-0.5 rounded-md mt-1.5 inline-block">
          {item.category}
        </span>
      </TableCell>
      
      {/* Tanggal */}
      <TableCell className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        {dayjs(item.date).format("D MMM YYYY")}
      </TableCell>
      
      {/* Tipe (Icon) */}
      <TableCell>
        <Badge 
          variant="outline" 
          className={`font-bold border-0 px-2 py-1 rounded-lg text-xs uppercase tracking-wide shadow-none ${
            isMasuk ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20" : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
          }`}
        >
          {isMasuk ? (
            <><ArrowUpRight className="w-3 h-3 mr-1" /> Masuk</>
          ) : (
            <><ArrowDownRight className="w-3 h-3 mr-1" /> Keluar</>
          )}
        </Badge>
      </TableCell>

      {/* Nominal */}
      <TableCell className={`font-mono font-bold text-right whitespace-nowrap text-base ${isMasuk ? "text-emerald-600" : "text-red-600"}`}>
        {isMasuk ? "+ " : "- "}{formatRupiah(item.amount)}
      </TableCell>
      
      {/* Aksi Delete dengan Konfirmasi */}
      <TableCell className="text-right w-[50px] pr-6">
        <div onClick={(e) => e.stopPropagation()} className="inline-block">
          <form
            action={async () => {
              await deleteFinanceRecord(item.id);
            }}
            onSubmit={(e) => {
              const msg = `Hapus data "${item.title}" senilai ${formatRupiah(item.amount)}?`;
              if (!confirm(msg)) {
                e.preventDefault();
              }
            }}
          >
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full w-8 h-8 p-0">
              <Trash2 className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </TableCell>
    </TableRow>
  );
}