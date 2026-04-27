import { NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun, Briefcase, User, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { NeuButton } from "./ui";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/practice", label: "Practice" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/interview", label: "Interview" },
];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfile = () => navigate(user ? "/profile" : "/auth");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 h-16 flex items-center justify-between px-4 md:px-6 bg-(--neu-bg) border-b border-slate-200/60 dark:border-slate-700/40"
      style={{ backdropFilter: "blur(20px)" }}
    >
      {/* Brand */}
      <NavLink to="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 gradient-purple rounded-xl flex items-center justify-center neu-out shrink-0">
          <Briefcase size={18} className="text-white" />
        </div>
        <span className="font-display font-extrabold text-xl text-grad-purple hidden sm:block">
          ProDev
        </span>
      </NavLink>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === "/"}>
            {({ isActive }) => (
              <span
                className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-violet-500 neu-in"
                    : "text-slate-500 dark:text-slate-400 hover:text-violet-500"
                }`}
              >
                {label}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <NeuButton onClick={toggle} className="w-9 h-9 px-0! py-0! rounded-xl">
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </NeuButton>

        {user ? (
          <div className="flex items-center gap-1.5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleProfile}
              className="hidden sm:flex items-center gap-2 neu-out rounded-xl px-3 py-1.5 cursor-pointer border-0 bg-(--neu-bg) hover:text-violet-500 transition-colors"
            >
              <img
                src={
                  user.avatar ||
                  `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(user.email)}&backgroundColor=b6e3f4`
                }
                alt="avatar"
                className="w-6 h-6 rounded-lg object-cover"
              />
              <span className="text-[13px] font-semibold text-slate-600 dark:text-slate-300 max-w-[80px] truncate">
                {user.name.split(" ")[0]}
              </span>
            </motion.button>
            <NeuButton
              onClick={handleLogout}
              className="w-9 h-9 px-0! py-0! rounded-xl"
              title="Sign out"
            >
              <LogOut size={15} className="text-slate-400" />
            </NeuButton>
          </div>
        ) : (
          <NeuButton
            variant="primary"
            className="rounded-xl gap-1.5 hidden sm:flex"
            onClick={handleProfile}
          >
            <User size={14} /> Sign In
          </NeuButton>
        )}
      </div>
    </motion.nav>
  );
}
