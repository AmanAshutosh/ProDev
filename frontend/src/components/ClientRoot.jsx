"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePageTransition } from "../context/TransitionContext";
import LoadingScreen from "./LoadingScreen";

export default function ClientRoot({ children }) {
  const { isLoading, isFalling, loadingVariant, finishLoading } =
    usePageTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Loading screen — only mounted client-side to avoid RSC module map conflicts */}
      {mounted && (
        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen
              key={`ls-${loadingVariant}`}
              variant={loadingVariant}
              onComplete={finishLoading}
            />
          )}
        </AnimatePresence>
      )}

      {/* Page wrapper — falls down on navigation */}
      <motion.div
        animate={{ y: isFalling ? "105vh" : 0 }}
        transition={
          isFalling
            ? { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0 }
        }
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </>
  );
}
