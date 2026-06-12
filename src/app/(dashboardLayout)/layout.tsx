export const dynamic = "force-dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Leaf } from "lucide-react";
import { ROLE_NAVIGATION } from "@/constant/navigation";
import { SidebarItem } from "@/components/ui/sidebarItem";
import { userService } from "@/services/user.service";
//import { getMyProfile } from "@/services/user.service";

export default async function DashboardLayout({
  admin,
  member,
}: {
  admin: React.ReactNode;
  member: React.ReactNode;
}) {
 

 const { data } = await userService.getSession()
  const user = data?.user
console.log("session user",user)
  if (!user) {
    redirect("/login");
  }

  const role = user?.role;

  let content: React.ReactNode = null;
  if (role === "ADMIN") content = admin;
  if (role === "MEMBER") content = member;

  const navItems = ROLE_NAVIGATION[role?.toUpperCase()] || [];

  return (
    <div className="min-h-screen flex bg-muted/40">
      {/* Sidebar */}
      <aside className="w-72 border-r bg-background hidden md:flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-green-200" />
            </div>
            <span className="text-green-900">EcoSpark Hub</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem label="Home" href="/" />
          <div className="pt-4 pb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Navigation
          </div>
          {navItems.map((item) => (
            <SidebarItem
  key={item.href}
  label={item.label}
  href={item.href}
  icon={item.icon}
/>
          ))}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-border/50">
          <div className="bg-green-50 rounded-2xl p-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
              Logged in as
            </p>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                {user?.name?.charAt(0)}
              </div>
              <div className="truncate">
                <p className="text-sm font-bold truncate">{user?.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {user?.email}
                </p>
                <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  {role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="font-black text-xl tracking-tight uppercase">
            {role?.toLowerCase()}{" "}
            <span className="text-green-700">Panel</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
              {user?.name?.charAt(0)}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold leading-none">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {content}
          </div>
        </main>
      </div>
    </div>
  );
}