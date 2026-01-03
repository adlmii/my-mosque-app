import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ActivityForm from "../activity-form"; // Import komponen baru

export const metadata = {
  title: "Tambah Kegiatan Baru",
};

export default function TambahKegiatanPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground" asChild>
          <Link href="/admin/kegiatan">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
           <h2 className="font-serif text-2xl font-bold text-foreground">Buat Agenda Baru</h2>
           <p className="text-muted-foreground text-sm">Pilih jenis kegiatan rutin atau sekali waktu.</p>
        </div>
      </div>

      {/* Render Form */}
      <ActivityForm />
      
    </div>
  );
}