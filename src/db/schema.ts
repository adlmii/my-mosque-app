import { pgTable, serial, text, varchar, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core";

// --- Enums ---
export const categoryEnum = pgEnum("category", ["Kajian", "Sosial", "Pendidikan", "Ibadah"]);
export const roleEnum = pgEnum("role", ["superadmin", "staff"]);
export const transactionTypeEnum = pgEnum("transaction_type", ["pemasukan", "pengeluaran"]);
export const financeCategoryEnum = pgEnum("finance_category", [
  "Infaq Jumat",
  "Operasional",
  "Sosial",
  "Pembangunan",
  "Pendidikan",
  "Lainnya"
]);

// Enum untuk Frekuensi dan Hari
export const frequencyEnum = pgEnum("frequency", ["rutin", "insidental"]);
export const dayOfWeekEnum = pgEnum("day_of_week", [
  "ahad", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"
]);

// --- Tabel Kegiatan (Agenda) ---
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique(),
  category: categoryEnum("category").notNull(),
  description: text("description"),
  ustadz: varchar("ustadz", { length: 100 }),
  location: varchar("location", { length: 255 }).default("Masjid Jami' Al-Huda"),
  imageUrl: text("image_url"),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  frequency: frequencyEnum("frequency").default("insidental").notNull(),
  
  date: timestamp("date"), 
  dayOfWeek: dayOfWeekEnum("day_of_week"), 
  time: varchar("time", { length: 50 }), 
});

// --- Tabel Users (Admin DKM) ---
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").default("staff"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Tabel Laporan Keuangan ---
export const financeRecords = pgTable("finance_records", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  amount: integer("amount").notNull(),
  type: transactionTypeEnum("type").notNull(),
  category: varchar("category", { length: 100 }).default("Umum"),
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});