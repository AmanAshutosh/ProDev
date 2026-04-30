"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/navigation";

const TransitionContext = createContext({
  isLoading: true,
  isFalling: false,
  loadingVariant: 0,
  navigateTo: () => {},
  finishLoading: () => {},
});

export function TransitionProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFalling, setIsFalling] = useState(false);
  const [loadingVariant, setLoadingVariant] = useState(0);
  const lastVariant = useRef(0);
  const router = useRouter();

  const finishLoading = useCallback(() => {
    setIsLoading(false);
    setIsFalling(false);
  }, []);

  const navigateTo = useCallback(
    (href) => {
      // Pick a different variant than last time
      let next = Math.floor(Math.random() * 5);
      if (next === lastVariant.current) next = (next + 1) % 5;
      lastVariant.current = next;
      setLoadingVariant(next);

      // 1. Page curtain falls
      setIsFalling(true);

      // 2. After curtain lands, show loading + navigate
      setTimeout(() => {
        setIsLoading(true);
        router.push(href);
      }, 620);
    },
    [router],
  );

  return (
    <TransitionContext.Provider
      value={{
        isLoading,
        isFalling,
        loadingVariant,
        navigateTo,
        finishLoading,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);
