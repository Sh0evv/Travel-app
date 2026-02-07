"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plane, Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getToken, logout } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null); // <--- тип указан
  ;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Tours", href: "/tours" },
    { name: "About", href: "/about" },
    { name: "My Bookings", href: "/my-bookings" },

  ];



  const handleLogout = () => {
    logout();
    setHasToken(false);
    setProfileOpen(false);
    router.push("/login");
  };

  useEffect(() => {
    setHasToken(!!getToken());
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-5">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-black">
              <Plane className="h-5 w-5 text-white" />
            </div>

            <span className="font-bold text-xl tracking-tight text-gray-900">
              TravelApp
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${isActive(link.href)
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0"
                    }`}
                />
              </Link>
            ))}

            {/* Profile dropdown */}
            {hasToken ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border p-2 animate-fadeIn">
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-600 hover:text-black transition">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 hover:scale-105 transition-transform duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white shadow-md border-t border-gray-200 transition-transform duration-300 overflow-hidden ${mobileOpen ? "max-h-screen py-4" : "max-h-0"
          }`}
      >
        <div className="flex flex-col px-5 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-gray-700 font-medium py-2 rounded-lg px-3 hover:bg-gray-100 transition ${isActive(link.href) ? "bg-gray-100" : ""
                }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {hasToken ? (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setMobileOpen(false)}
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 py-2 px-3 rounded-lg hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="py-2 px-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="py-2 px-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Fade animation */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </nav>
  );
}
