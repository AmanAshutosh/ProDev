'use client'
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Code2, Map, Mic, BarChart2, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const ITEMS = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Home"     },
  { to: "/practice",  icon: Code2,           label: "Practice" },
  { to: "/roadmap",   icon: Map,             label: "Roadmap"  },
  { to: "/interview", icon: Mic,             label: "Prep"     },
  { to: "/progress",  icon: BarChart2,       label: "Stats"    },
];

export default function BottomNav() {
  const { user }  = useAuth();
  const router    = useRouter();
  const pathname  = usePathname();

  const isActive = (to) =>
    to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(to);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-(--neu-bg) rounded-t-2xl pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex justify-around px-1 pt-2 pb-5">
        {ITEMS.map(({ to, icon: Icon, label }) => (
          <Link key={to} href={to}>
            <motion.div
              whileTap={{ scale: 0.88 }}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                isActive(to) ? "text-violet-500" : "text-slate-400"
              }`}
            >
              <Icon size={22} />
              <span className="text-[9px] font-bold">{label}</span>
            </motion.div>
          </Link>
        ))}

        <motion.div
          whileTap={{ scale: 0.88 }}
          onClick={() => router.push(user ? "/profile" : "/auth")}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors text-slate-400 cursor-pointer"
        >
          {user ? (
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(user.email)}&backgroundColor=b6e3f4`}
              alt="avatar"
              className="w-6 h-6 rounded-lg object-cover"
            />
          ) : (
            <User size={22} />
          )}
          <span className="text-[9px] font-bold">Profile</span>
        </motion.div>
      </div>
    </nav>
  );
}
