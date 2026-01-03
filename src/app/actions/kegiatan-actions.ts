"use server";

import { db } from "@/db";
import { activities } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- 1. HAPUS KEGIATAN ---
export async function deleteActivity(id: number) {
  try {
    await db.delete(activities).where(eq(activities.id, id));
    
    revalidatePath("/admin/kegiatan");
    revalidatePath("/kegiatan");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus kegiatan:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}

// --- 2. TAMBAH KEGIATAN BARU ---
export async function createActivity(formData: FormData) {
  // Ambil data umum
  const title = formData.get("title") as string;
  const category = formData.get("category") as any;
  const description = formData.get("description") as string;
  const ustadz = formData.get("ustadz") as string;
  const location = formData.get("location") as string;
  const imageUrl = formData.get("imageUrl") as string;
  
  // Ambil jenis frekuensi (rutin / insidental)
  const frequency = formData.get("frequency") as "rutin" | "insidental";

  // Validasi Data Dasar
  if (!title || !category || !frequency) {
    return { error: "Mohon lengkapi data wajib (Judul, Kategori, Jenis)." };
  }

  // Siapkan variabel untuk logic percabangan
  let dateValue: Date | null = null;
  let dayOfWeekValue: any = null;
  let timeValue: string | null = null;

  // LOGIC PERCABANGAN
  if (frequency === "rutin") {
    // Jika Rutin: Wajib punya Hari & Jam
    const day = formData.get("dayOfWeek") as string;
    const time = formData.get("time") as string;

    if (!day || !time) {
      return { error: "Untuk kegiatan rutin, Hari dan Jam wajib diisi." };
    }
    dayOfWeekValue = day;
    timeValue = time;

  } else {
    // Jika Insidental: Wajib punya Tanggal Lengkap
    const dateStr = formData.get("date") as string;
    
    if (!dateStr) {
      return { error: "Untuk kegiatan waktu tertentu, Tanggal wajib diisi." };
    }
    dateValue = new Date(dateStr);
  }

  try {
    await db.insert(activities).values({
      title,
      category,
      description: description || "",
      ustadz: ustadz || "-",
      location: location || "Masjid Jami' Al-Huda",
      imageUrl: imageUrl || "",
      
      // Data Baru
      frequency,
      date: dateValue,       // Terisi jika insidental
      dayOfWeek: dayOfWeekValue, // Terisi jika rutin
      time: timeValue,           // Terisi jika rutin
    });

    revalidatePath("/admin/kegiatan");
    revalidatePath("/kegiatan");
    revalidatePath("/");
  } catch (error) {
    console.error("Gagal tambah kegiatan:", error);
    return { error: "Gagal menyimpan ke database." };
  }

  redirect("/admin/kegiatan");
}

// --- 3. UPDATE KEGIATAN ---
export async function updateActivity(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as any;
  const description = formData.get("description") as string;
  const ustadz = formData.get("ustadz") as string;
  const location = formData.get("location") as string;
  const imageUrl = formData.get("imageUrl") as string;

  const frequency = formData.get("frequency") as "rutin" | "insidental";

  if (!id || !title || !category || !frequency) {
    return { error: "Data tidak lengkap." };
  }

  let dateValue: Date | null = null;
  let dayOfWeekValue: any = null;
  let timeValue: string | null = null;

  if (frequency === "rutin") {
    const day = formData.get("dayOfWeek") as string;
    const time = formData.get("time") as string;
    if (!day || !time) return { error: "Hari dan Jam wajib diisi." };
    
    dayOfWeekValue = day;
    timeValue = time;
  } else {
    const dateStr = formData.get("date") as string;
    if (!dateStr) return { error: "Tanggal wajib diisi." };
    
    dateValue = new Date(dateStr);
  }

  try {
    await db.update(activities)
      .set({
        title,
        category,
        description,
        ustadz,
        location,
        imageUrl,
        frequency,
        date: dateValue,
        dayOfWeek: dayOfWeekValue,
        time: timeValue,
      })
      .where(eq(activities.id, parseInt(id)));

    revalidatePath("/admin/kegiatan");
    revalidatePath("/kegiatan");
    revalidatePath("/");
  } catch (error) {
    console.error("Gagal update kegiatan:", error);
    return { error: "Gagal mengupdate database." };
  }

  redirect("/admin/kegiatan");
}