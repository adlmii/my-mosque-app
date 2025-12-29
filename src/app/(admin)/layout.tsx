import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./admin-sidebar"; // Import komponen baru
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-optimized">
      
      {/* Sidebar Client Component */}
      <AdminSidebar user={session.user} />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        
        {/* Mobile Header Placeholder (Opsional: Tambahkan Toggle di sini nanti) */}
        <div className="md:hidden mb-6 pb-4 border-b">
           <h1 className="font-bold text-lg">Admin Panel</h1>
        </div>

        {/* Tombol Logout (Tetap di sini atau dipindah ke Sidebar Client) */}
        {/* Jika ingin logout server action, bisa ditaruh di tempat yang sesuai atau dipass ke client component */}
        
        {children}
      </main>
    </div>
  );
}