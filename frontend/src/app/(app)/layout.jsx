"use client";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePageTransition } from "../../context/TransitionContext";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import BottomNav from "../../components/BottomNav";
import TopLoader from "../../components/TopLoader";

export default function AppLayout({ children }) {
  const { user, authLoading } = useAuth();
  const { navigateTo } = usePageTransition();

  useEffect(() => {
    if (!authLoading && !user) {
      navigateTo("/auth");
    }
  }, [user, authLoading]); // eslint-disable-line

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[var(--neu-bg)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--neu-bg)] text-slate-700 dark:text-slate-200 transition-colors duration-300">
      <TopLoader />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
