'use client'
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard, Code2, Map, Mic, FileText,
  BarChart2, Radio, Bot, Flame, User, LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const SECTIONS = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/practice",  icon: Code2,           label: "Practice", badge: "NEW" },
      { to: "/roadmap",   icon: Map,             label: "Roadmap"  },
      { to: "/interview", icon: Mic,             label: "Interview Prep" },
    ],
  },
  {
    label: "Tools",
    items: [
      { to: "/resume",    icon: FileText,  label: "Resume"     },
      { to: "/progress",  icon: BarChart2, label: "Progress"   },
      { to: "/livestream",icon: Radio,     label: "Live Stream"},
    ],
  },
  {
    label: "AI Tools",
    items: [{ to: "/ai", icon: Bot, label: "AI Assistant", badge: "BETA" }],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();

  const isActive = (to) =>
    to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(to);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="w-52 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-4 px-2 hidden md:flex flex-col"
    >
      <div className="flex-1">
        {SECTIONS.map(({ label, items }) => (
          <div key={label} className="mb-5">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-3 mb-2">
              {label}
            </p>
            {items.map(({ to, icon: Icon, label: lbl, badge }) => (
              <Link key={to} href={to}>
                <motion.div
                  whileHover={{ x: 2 }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold mb-0.5 transition-all duration-200 cursor-pointer ${
                    isActive(to)
                      ? "neu-out text-violet-500"
                      : "text-slate-500 dark:text-slate-400 hover:text-violet-500 hover:neu-out"
                  }`}
                >
                  <Icon size={17} />
                  <span className="flex-1">{lbl}</span>
                  {badge && (
                    <span className="gradient-purple text-white rounded-md text-[9px] font-bold px-1.5 py-0.5">
                      {badge}
                    </span>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-2 mb-3 space-y-2">
        {user ? (
          <>
            <motion.div
              whileHover={{ x: 2 }}
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer text-slate-500 dark:text-slate-400 hover:text-violet-500 hover:neu-out transition-all duration-200"
            >
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(user.email)}&backgroundColor=b6e3f4`}
                alt="avatar"
                className="w-5 h-5 rounded-md object-cover"
              />
              <span className="flex-1 truncate">{user.name.split(" ")[0]}</span>
            </motion.div>
            <motion.div
              whileHover={{ x: 2 }}
              onClick={() => { logout(); router.push("/"); }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer text-slate-400 hover:text-red-400 hover:neu-out transition-all duration-200"
            >
              <LogOut size={17} />
              <span>Sign Out</span>
            </motion.div>
          </>
        ) : (
          <motion.div
            whileHover={{ x: 2 }}
            onClick={() => router.push("/auth")}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer text-slate-500 dark:text-slate-400 hover:text-violet-500 hover:neu-out transition-all duration-200"
          >
            <User size={17} />
            <span>Sign In</span>
          </motion.div>
        )}
      </div>

      <div className="mx-2 neu-in rounded-xl p-3 text-center">
        <Flame size={20} className="text-amber-400 mx-auto mb-1" />
        <div className="text-lg font-display font-extrabold text-grad-amber">
          {user?.streak ?? 0}
        </div>
        <div className="text-[10px] text-slate-400 font-semibold">Day Streak</div>
      </div>
    </motion.aside>
  );
}
