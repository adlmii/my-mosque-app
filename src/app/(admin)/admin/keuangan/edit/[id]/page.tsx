import Link from "next/link";
import { db } from "@/db";
import { financeRecords } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import FinanceForm from "../../finance-form"; // Import komponen baru

export const metadata = { title: "Edit Keuangan" };

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditKeuanganPage({ params }: Props) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  
  if (isNaN(id)) redirect("/admin/keuangan");

  const result = await db.select().from(financeRecords).where(eq(financeRecords.id, id)).limit(1);
  const data = result[0];

  if (!data) redirect("/admin/keuangan");

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground" asChild>
          <Link href="/admin/keuangan">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
           <h2 className="font-serif text-2xl font-bold text-foreground">Edit Transaksi</h2>
           <p className="text-muted-foreground text-sm">Perbarui data pemasukan atau pengeluaran kas masjid.</p>
        </div>
      </div>

      <FinanceForm initialData={data} />
      
    </div>
  );
}