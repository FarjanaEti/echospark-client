"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Leaf, Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dashboardUrl =
    (user as any)?.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/member";

  const links = [
    { title: "Home", url: "/" },
    { title: "Ideas", url: "/ideas" },
    { title: "About", url: "/about" },
    { title: "Blog", url: "/blog" },
    ...(user ? [{ title: "Dashboard", url: dashboardUrl }] : []),
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
            <Leaf className="w-4 h-4 text-green-200" />
          </div>
          <span
            className={`font-semibold text-lg transition-colors ${scrolled ? "text-green-900" : "text-white"
              }`}
          >
            EcoSpark Hub
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              className={`text-sm font-medium transition-colors hover:text-green-400 ${scrolled ? "text-green-900" : "text-white/85"
                }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span
                className={`text-sm ${scrolled ? "text-green-800" : "text-white/80"}`}
              >
                {user.name}
              </span>
              <button
                onClick={handleSignOut}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${scrolled
                    ? "border-green-700 text-green-700 hover:bg-green-50"
                    : "border-white/40 text-white hover:bg-white/10"
                  }`}
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${scrolled
                    ? "border-green-700 text-green-700 hover:bg-green-50"
                    : "border-white/40 text-white hover:bg-white/10"
                  }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-full text-sm bg-green-700 text-white hover:bg-green-800 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className={scrolled ? "text-green-900" : "text-white"} />
          ) : (
            <Menu className={scrolled ? "text-green-900" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-green-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              className="text-green-900 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          {user ? (
            <button
               onClick={handleSignOut}
              className="text-left text-sm text-red-600"
            >
              Sign out
            </button>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-2 rounded-full border border-green-700 text-green-700 text-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-full bg-green-700 text-white text-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}