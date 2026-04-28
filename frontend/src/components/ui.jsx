'use client'
import { motion } from "framer-motion";
import { useRef } from "react";

function createRipple(e, el) {
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top  - size / 2;
  const ripple = document.createElement("span");
  ripple.style.cssText = `
    position:absolute;left:${x}px;top:${y}px;
    width:${size}px;height:${size}px;
    border-radius:50%;pointer-events:none;
    background:rgba(255,255,255,0.25);
    transform:scale(0);animation:ripple-anim 0.5s ease-out forwards;
  `;
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

export function NeuCard({ children, className = "", hover = true, onClick, style }) {
  return (
    <motion.div
      className={`neu-card rounded-2xl p-5 bg-(--neu-bg) ${className}`}
      style={style}
      whileHover={hover ? { y: -2, boxShadow: "var(--neu-shadow-deep)" } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export function NeuButton({ children, className = "", onClick, style, variant = "default", disabled = false }) {
  const ref = useRef(null);
  const base = "relative overflow-hidden rounded-xl px-4 py-2 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-0";
  const variants = {
    default: "neu-out bg-(--neu-bg) text-slate-600 dark:text-slate-300 hover:text-violet-500",
    primary: "gradient-purple text-white shadow-lg hover:opacity-90 hover:scale-[1.02]",
    ghost:   "neu-in bg-(--neu-bg) text-slate-500 dark:text-slate-400",
  };

  const handleClick = (e) => {
    if (disabled) return;
    if (ref.current) createRipple(e, ref.current);
    onClick?.(e);
  };

  return (
    <motion.button
      ref={ref}
      className={`${base} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={style}
      whileTap={disabled ? {} : { scale: 0.96 }}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  );
}

export function ProgressBar({ value, color = "gradient-purple", className = "" }) {
  return (
    <div className={`h-2.5 rounded-full neu-in overflow-hidden ${className}`}>
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

export function DiffBadge({ diff }) {
  const map = {
    Easy:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Hard:   "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${map[diff] || map.Easy}`}>
      {diff}
    </span>
  );
}

export function ComingSoon({ title, desc, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="gradient-amber w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg mx-auto">
        {Icon && <Icon size={30} className="text-white" />}
      </div>
      <h3 className="text-xl font-bold font-display text-slate-700 dark:text-slate-200 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-5 max-w-xs">{desc}</p>
      <span className="inline-flex items-center gap-2 gradient-amber text-white rounded-xl px-4 py-2 text-xs font-bold">
        Coming in V2
      </span>
    </motion.div>
  );
}

export function SkeletonCard({ rows = 3 }) {
  return (
    <div className="neu-card rounded-2xl p-5 space-y-3">
      <div className="skeleton h-5 w-2/3 rounded-lg" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton h-4 rounded-lg" style={{ width: `${85 - i * 12}%` }} />
      ))}
      <div className="skeleton h-9 rounded-xl w-full mt-2" />
    </div>
  );
}

export function SectionHeader({ title, sub, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
      <h1 className="text-2xl font-display font-extrabold text-slate-800 dark:text-slate-100 mb-1">{title}</h1>
      {sub && <p className="text-sm text-slate-400">{sub}</p>}
      {children}
    </motion.div>
  );
}

export function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 neu-in rounded-xl p-1 mb-6 overflow-x-auto no-scrollbar">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer border-0 ${
            active === t.id
              ? "neu-out bg-(--neu-bg) text-violet-500"
              : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-transparent"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function LiveBadge({ online = true }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white ${online ? "bg-red-500" : "bg-slate-400"}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-white ${online ? "live-dot" : ""}`} />
      {online ? "LIVE" : "OFFLINE"}
    </span>
  );
}
