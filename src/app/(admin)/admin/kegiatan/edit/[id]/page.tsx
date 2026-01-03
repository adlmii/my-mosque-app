import Link from "next/link";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import ActivityForm from "../../activity-form"; // Import komponen baru

export const metadata = {
  title: "Edit Kegiatan",
};

type Props = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic";

export default async function EditKegiatanPage({ params }: Props) {
  const resolvedParams = await params;
  const activityId = parseInt(resolvedParams.id);
  
  if (isNaN(activityId)) {
    redirect("/admin/kegiatan");
  }

  // Ambil data kegiatan dari database
  const result = await db.select().from(activities).where(eq(activities.id, activityId)).limit(1);
  const data = result[0];

  if (!data) {
    redirect("/admin/kegiatan");
  }

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
           <h2 className="font-serif text-2xl font-bold text-foreground">Edit Kegiatan</h2>
           <p className="text-muted-foreground text-sm">Perbarui informasi detail kegiatan masjid.</p>
        </div>
      </div>

      {/* Render Form dengan Data Awal */}
      <ActivityForm initialData={data} />
      
    </div>
  );
}