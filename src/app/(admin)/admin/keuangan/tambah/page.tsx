import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FinanceForm from "../finance-form"; // Import komponen baru

export const metadata = { title: "Catat Keuangan Baru" };

export default function TambahKeuanganPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-in slide-in-from-bottom-4 duration-500 pb-12">
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

      {/* Render Form */}
      <FinanceForm />
      
    </div>
  );
}