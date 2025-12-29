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
  const title = formData.get("title") as string;
  const category = formData.get("category") as any; // "Kajian", "Sosial", dll
  const dateStr = formData.get("date") as string;
  const ustadz = formData.get("ustadz") as string;
  const location = formData.get("location") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const description = formData.get("description") as string;

  if (!title || !dateStr || !category) {
    return { error: "Mohon lengkapi data wajib." };
  }

  try {
    await db.insert(activities).values({
      title,
      category,
      date: new Date(dateStr),
      ustadz: ustadz || "-",
      location: location || "Masjid Jami' Al-Huda",
      imageUrl: imageUrl || "",
      description: description || "",
    });

    // Refresh halaman terkait
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
  const dateStr = formData.get("date") as string;
  const ustadz = formData.get("ustadz") as string;
  const location = formData.get("location") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const description = formData.get("description") as string;

  if (!id || !title || !dateStr) {
    return { error: "Data tidak lengkap." };
  }

  try {
    await db.update(activities)
      .set({
        title,
        category,
        date: new Date(dateStr),
        ustadz,
        location,
        imageUrl,
        description,
      })
      .where(eq(activities.id, parseInt(id)));

    revalidatePath("/admin/kegiatan");
    revalidatePath("/kegiatan");
    revalidatePath("/");
  } catch (error) {
    console.error("Gagal update kegiatan:", error);
    return { error: "Gagal mengupdate database." };
  }

  revalidatePath("/admin/kegiatan");
  redirect("/admin/kegiatan");
}