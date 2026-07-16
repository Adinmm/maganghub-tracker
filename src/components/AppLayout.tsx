import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  CheckSquare,
  GraduationCap,
  Home,
  LogOut,
  School,
  Settings,
  ScrollText,
  Users,
  Bike,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Dashboard", icon: Home, end: true },
  { to: "/motors", label: "Motors", icon: Bike },
  { to: "/settings", label: "Settings", icon: Settings2 },

];

export default function AppLayout() {
  // Data statis tiruan (mock data) khusus untuk mempertahankan UI profil admin
  const mockUser = {
    name: "Admin Presensi",
    role: "administrator",
  };

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-background">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center gap-2 px-6 border-b">
          <div className="h-9 w-9 rounded-md bg-primary text-primary-foreground grid place-items-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-sm leading-tight">
              Presensi SMK
            </div>
            <div className="text-[11px] text-muted-foreground">
              Sistem Kehadiran
            </div>
          </div>
        </div>

        {/* Sidebar Navigasi */}
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )
              }
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer Profil */}
        <div className="p-3 border-t">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-9 w-9 rounded-full bg-muted grid place-items-center text-sm font-semibold text-foreground capitalize">
              {mockUser.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate text-foreground">
                {mockUser.name}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {mockUser.role}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Keluar"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Konten Utama & Navigasi Mobile */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Mobile */}
        <header className="md:hidden h-14 border-b bg-background flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sm">Presensi SMK</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-1" />
              Keluar
            </Button>
          </div>
        </header>

        {/* Halaman Render Aplikasi */}
        <main className="flex-1 p-6 md:p-8 w-full mx-auto overflow-auto">
          <Outlet />
        </main>

        {/* Bottom Navigation Mobile */}
        <nav className="md:hidden grid grid-cols-3 border-t bg-background sticky bottom-0 z-50">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center py-2 text-[10px] gap-0.5 transition-colors",
                  isActive ? "text-primary font-medium" : "text-muted-foreground",
                )
              }
            >
              <n.icon className="h-4 w-4" />
              <span className="truncate max-w-[50px]">{n.label.split(" ")[0]}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}