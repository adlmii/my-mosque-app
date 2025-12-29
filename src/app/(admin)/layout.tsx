import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Wallet, 
  Settings, 
  LogOut, 
  Building2 
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Cek Sesi Login
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-optimized">
      
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 leading-none">Admin DKM</h1>
            <p className="text-xs text-gray-500 mt-1">Panel Pengurus</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/admin" icon={<LayoutDashboard className="w-5 h-5" />}>
            Dashboard
          </NavLink>
          <NavLink href="/admin/kegiatan" icon={<CalendarDays className="w-5 h-5" />}>
            Kelola Kegiatan
          </NavLink>
          <NavLink href="/admin/keuangan" icon={<Wallet className="w-5 h-5" />}>
            Laporan Keuangan
          </NavLink>
          <NavLink href="/admin/pengaturan" icon={<Settings className="w-5 h-5" />}>
            Profil Masjid
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              {session.user?.name?.charAt(0) || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{session.user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
            </div>
          </div>
          
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          </form>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>

    </div>
  );
}

// Komponen Kecil untuk Link Sidebar
function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-emerald-700 transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}