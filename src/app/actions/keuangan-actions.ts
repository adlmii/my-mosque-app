"use server";

import { db } from "@/db";
import { financeRecords } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- 1. TAMBAH DATA ---
export async function createFinanceRecord(formData: FormData) {
  const title = formData.get("title") as string;
  const amount = parseInt(formData.get("amount") as string);
  const type = formData.get("type") as "pemasukan" | "pengeluaran";
  const category = formData.get("category") as string;
  const dateStr = formData.get("date") as string;
  const description = formData.get("description") as string;

  if (!title || !amount || !type || !dateStr) {
    return { error: "Mohon lengkapi data wajib." };
  }

  try {
    await db.insert(financeRecords).values({
      title,
      amount,
      type,
      category,
      date: new Date(dateStr),
      description: description || "",
    });

    revalidatePath("/admin/keuangan");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Gagal tambah keuangan:", error);
    return { error: "Gagal menyimpan data." };
  }

  redirect("/admin/keuangan");
}

// --- 2. HAPUS DATA ---
export async function deleteFinanceRecord(id: number) {
  try {
    await db.delete(financeRecords).where(eq(financeRecords.id, id));
    revalidatePath("/admin/keuangan");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus data" };
  }
}

// --- 3. UPDATE DATA ---
export async function updateFinanceRecord(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const title = formData.get("title") as string;
  const amount = parseInt(formData.get("amount") as string);
  const type = formData.get("type") as "pemasukan" | "pengeluaran";
  const category = formData.get("category") as string;
  const dateStr = formData.get("date") as string;
  const description = formData.get("description") as string;

  try {
    await db.update(financeRecords)
      .set({
        title,
        amount,
        type,
        category,
        date: new Date(dateStr),
        description,
      })
      .where(eq(financeRecords.id, id));

    revalidatePath("/admin/keuangan");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Gagal update:", error);
    return { error: "Gagal update data." };
  }

  redirect("/admin/keuangan");
}