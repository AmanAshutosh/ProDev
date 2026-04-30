"use client";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { ProgressProvider } from "../context/ProgressContext";
import { TransitionProvider } from "../context/TransitionContext";
import ClientRoot from "./ClientRoot";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <TransitionProvider>
            <ClientRoot>{children}</ClientRoot>
          </TransitionProvider>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
