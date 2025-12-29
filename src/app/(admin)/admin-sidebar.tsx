"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Wallet, Settings, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/kegiatan", label: "Kelola Kegiatan", icon: CalendarDays },
  { href: "/admin/keuangan", label: "Laporan Keuangan", icon: Wallet },
  { href: "/admin/pengaturan", label: "Profil Masjid", icon: Settings },
];

export function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col fixed h-full z-10">
      
      {/* Branding Header */}
      <div className="p-8 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            {/* Menggunakan Typography System */}
            <h1 className="font-serif text-xl font-bold tracking-tight text-foreground leading-none">
              Admin DKM
            </h1>
            <p className="text-xs font-sans text-muted-foreground mt-1 tracking-wide uppercase">
              Panel Pengurus
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-2">
        <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 font-sans">
          Menu Utama
        </p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 btn-text",
                isActive 
                  ? "bg-secondary text-primary font-bold shadow-sm" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground/70")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-6 border-t border-border bg-background">
        <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30 border border-border/50">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-serif font-bold text-lg">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-foreground truncate font-serif">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate font-sans">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}