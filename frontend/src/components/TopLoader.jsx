"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function TopLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    setVisible(true);
    setProgress(0);

    const schedule = (fn, ms) => {
      const t = setTimeout(fn, ms);
      timers.current.push(t);
    };

    schedule(() => setProgress(25), 60);
    schedule(() => setProgress(55), 250);
    schedule(() => setProgress(78), 500);
    schedule(() => setProgress(92), 700);
    schedule(() => setProgress(100), 900);
    schedule(() => setVisible(false), 1150);

    return () => timers.current.forEach(clearTimeout);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 3,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #6c63ff, #9f7aea, #38b2ac)",
          boxShadow: "0 0 12px rgba(108,99,255,0.9)",
          borderRadius: "0 2px 2px 0",
          transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -3,
          left: `calc(${progress}% - 4px)`,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#9f7aea",
          boxShadow: "0 0 10px 2px rgba(159,122,234,0.9)",
          transition: "left 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}
