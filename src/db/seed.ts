import "dotenv/config";
import { db } from "./index";
import { users } from "./schema";
import { hash } from "bcryptjs";

async function main() {
  console.log("🔐 Membuat akun Super Admin...");

  // 1. Hash password
  const passwordRaw = "admin123";
  const hashedPassword = await hash(passwordRaw, 10);

  // 2. Masukkan ke database
  await db.insert(users).values({
    name: "Super Admin DKM",
    email: "admin@masjid.com",
    password: hashedPassword,
    role: "superadmin",
  });

  console.log("✅ Admin berhasil dibuat!");
  console.log("📧 Email: admin@masjid.com");
  console.log("🔑 Pass: admin123");
  process.exit(0);
}

main().catch((err) => {
  console.error("Gagal seed admin:", err);
  process.exit(1);
});